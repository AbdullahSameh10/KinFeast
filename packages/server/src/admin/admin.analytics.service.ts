import pool from "../config/database.js";

export const getAdminAnalytics = async () => {
  const [
    overview,
    activity,
    status,
    categories,
    cuisines,
    marketingSources,
    topRecipes,
    topChefs,
  ] = await Promise.all([
    pool.query(
      `
        SELECT
          (SELECT COUNT(*)::int FROM users) AS users,
          (SELECT COUNT(*)::int FROM users WHERE role = 'chef') AS chefs,
          (SELECT COUNT(*)::int FROM recipes) AS recipes,
          (SELECT COUNT(*)::int FROM recipes WHERE status = 'published') AS published_recipes,
          (SELECT COUNT(*)::int FROM recipes WHERE status = 'pending') AS pending_recipes,
          (SELECT COUNT(*)::int FROM recipes WHERE status = 'rejected') AS rejected_recipes,
          (SELECT COUNT(*)::int FROM recipe_views) AS views,
          (SELECT COUNT(*)::int FROM recipe_likes) AS likes,
          (SELECT COUNT(*)::int FROM recipe_reviews) AS reviews
      `,
    ),

    pool.query(
      `
        WITH days AS (
          SELECT generate_series(
            CURRENT_DATE - INTERVAL '29 days',
            CURRENT_DATE,
            INTERVAL '1 day'
          )::date AS day
        ),
        v AS (
          SELECT
            viewed_at::date AS day,
            COUNT(*)::int AS count
          FROM recipe_views
          WHERE viewed_at >= CURRENT_DATE - INTERVAL '29 days'
          GROUP BY viewed_at::date
        ),
        r AS (
          SELECT
            created_at::date AS day,
            COUNT(*)::int AS count
          FROM recipes
          WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
          GROUP BY created_at::date
        ),
        u AS (
          SELECT
            created_at::date AS day,
            COUNT(*)::int AS count
          FROM users
          WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
          GROUP BY created_at::date
        )
        SELECT
          TO_CHAR(days.day, 'YYYY-MM-DD') AS date,
          COALESCE(v.count, 0)::int AS views,
          COALESCE(r.count, 0)::int AS recipes,
          COALESCE(u.count, 0)::int AS users
        FROM days
        LEFT JOIN v ON v.day = days.day
        LEFT JOIN r ON r.day = days.day
        LEFT JOIN u ON u.day = days.day
        ORDER BY days.day
      `,
    ),

    pool.query(
      `
        SELECT
          status,
          COUNT(*)::int AS count
        FROM recipes
        GROUP BY status
      `,
    ),

    pool.query(
      `
        SELECT
          rc.id,
          rc.name,
          COUNT(r.id)::int AS count
        FROM recipe_categories rc
        LEFT JOIN recipes r
          ON r.category_id = rc.id
          AND r.status = 'published'
        GROUP BY rc.id, rc.name
        ORDER BY count DESC, rc.name
      `,
    ),

    pool.query(
      `
        SELECT
          c.id,
          c.name,
          COUNT(r.id)::int AS count
        FROM cuisines c
        LEFT JOIN recipes r
          ON r.cuisine_id = c.id
          AND r.status = 'published'
        GROUP BY c.id, c.name
        ORDER BY count DESC, c.name
        LIMIT 8
      `,
    ),
    pool.query(
      `WITH source_counts AS (SELECT ms.id, ms.source_key, ms.sort_order, COUNT(ma.id)::int AS count FROM marketing_sources ms LEFT JOIN marketing_attributions ma ON ma.source_id = ms.id GROUP BY ms.id, ms.source_key, ms.sort_order ), totals AS ( SELECT COALESCE(SUM(count), 0)::int AS total FROM source_counts ) SELECT sc.id, sc.source_key, sc.count, CASE WHEN totals.total = 0 THEN 0 ELSE ROUND((sc.count::numeric / totals.total::numeric) * 100, 1) END AS percentage FROM source_counts sc CROSS JOIN totals ORDER BY sc.count DESC, sc.sort_order ASC, sc.id ASC `,
    ),

    pool.query(
      `
        SELECT
          r.id,
          r.title,
          u.name AS author_name,
          rc.name AS category_name,
          COUNT(DISTINCT rv.id)::int AS views,
          COUNT(DISTINCT (rl.user_id, rl.recipe_id))::int AS likes,
          COUNT(DISTINCT rr.id)::int AS reviews
        FROM recipes r
        JOIN users u
          ON u.id = r.author_id
        LEFT JOIN recipe_categories rc
          ON rc.id = r.category_id
        LEFT JOIN recipe_views rv
          ON rv.recipe_id = r.id
        LEFT JOIN recipe_likes rl
          ON rl.recipe_id = r.id
        LEFT JOIN recipe_reviews rr
          ON rr.recipe_id = r.id
        WHERE r.status = 'published'
        GROUP BY
          r.id,
          r.title,
          u.name,
          rc.name
        ORDER BY
          views DESC,
          likes DESC,
          r.created_at DESC
        LIMIT 8
      `,
    ),

    pool.query(
      `
        SELECT
          u.id,
          u.name,
          u.profile_image,
          COUNT(DISTINCT r.id)::int AS recipe_count,
          COUNT(DISTINCT r.id) FILTER (
            WHERE r.status = 'published'
          )::int AS published_count,
          COUNT(DISTINCT f.follower_id)::int AS follower_count
        FROM users u
        LEFT JOIN recipes r
          ON r.author_id = u.id
        LEFT JOIN follows f
          ON f.following_id = u.id
        WHERE u.role = 'chef'
        GROUP BY
          u.id,
          u.name,
          u.profile_image
        ORDER BY
          published_count DESC,
          follower_count DESC,
          recipe_count DESC,
          u.created_at DESC
        LIMIT 8
      `,
    ),
  ]);

  const o = overview.rows[0];
  const sm = new Map(status.rows.map((x) => [x.status, x.count]));

  return {
    overview: {
      users: o.users,
      chefs: o.chefs,
      recipes: o.recipes,
      publishedRecipes: o.published_recipes,
      pendingRecipes: o.pending_recipes,
      rejectedRecipes: o.rejected_recipes,
      views: o.views,
      likes: o.likes,
      reviews: o.reviews,
    },

    activity: activity.rows,

    recipeStatus: [
      {
        status: "Published",
        count: sm.get("published") ?? 0,
      },
      {
        status: "Pending",
        count: sm.get("pending") ?? 0,
      },
      {
        status: "Rejected",
        count: sm.get("rejected") ?? 0,
      },
    ],

    categories: categories.rows,
    cuisines: cuisines.rows,
    marketingSources: marketingSources.rows,
    topRecipes: topRecipes.rows,
    topChefs: topChefs.rows,
  };
};
