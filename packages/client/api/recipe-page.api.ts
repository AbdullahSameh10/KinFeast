import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RecipeApiResponse {
  success: boolean;
  recipe?: {
    recipe_image?: string | null;
  } | null;
}

function getDeploymentUrl(): string {
  const deploymentUrl = process.env.VERCEL_URL;

  return deploymentUrl
    ? `https://${deploymentUrl}`
    : "https://kinfeast.vercel.app";
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function getAppShell(): Promise<string> {
  const response = await fetch(`${getDeploymentUrl()}/index.html`);

  if (!response.ok) {
    throw new Error("Unable to load the application HTML.");
  }

  return response.text();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const slug = req.query.slug;

  if (typeof slug !== "string" || !slug.trim()) {
    res.status(400).send("Recipe slug is required.");
    return;
  }

  try {
    const [html, recipeResponse] = await Promise.all([
      getAppShell(),
      fetch(
        `https://kinfeast-backend.vercel.app/api/recipes/${encodeURIComponent(slug)}`,
        { cache: "no-store" },
      ),
    ]);

    let updatedHtml = html;

    if (recipeResponse.ok) {
      const data = (await recipeResponse.json()) as RecipeApiResponse;
      const image = data.success ? data.recipe?.recipe_image : null;

      if (typeof image === "string" && image.trim()) {
        const imageUrl = new URL(image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Invalid recipe image URL.");
        }

        const preload = `<link rel="preload" as="image" href="${escapeHtmlAttribute(imageUrl.href)}" fetchpriority="high">`;

        updatedHtml = html.replace("</head>", `${preload}</head>`);
      }
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(updatedHtml);
  } catch (error: unknown) {
    console.error("Recipe HTML preload error:", error);

    try {
      const fallbackHtml = await getAppShell();

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.status(200).send(fallbackHtml);
    } catch (fallbackError: unknown) {
      console.error("Recipe HTML fallback error:", fallbackError);
      res.status(502).send("Unable to load KinFeast.");
    }
  }
}
