import pool from "../config/database.js";

export const getAdminDashboard = async () => {
  const [
    usersResult,
    chefsResult,
    publishedRecipesResult,
    pendingRecipesResult,
    rejectedRecipesResult,
    activityResult,
    categoryResult,
    recentUsersResult,
    pendingRecipesResultDetailed,
  ] = await Promise.all([
    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM users
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM users
      WHERE role = 'chef'
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM recipes
      WHERE status = 'published'
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM recipes
      WHERE status = 'pending'
    `),

    pool.query(`
      SELECT COUNT(*)::int AS count
      FROM recipes
      WHERE status = 'rejected'
    `),

    pool.query(`
      WITH days AS (
        SELECT generate_series(
          CURRENT_DATE - INTERVAL '6 days',
          CURRENT_DATE,
          INTERVAL '1 day'
        )::date AS day
      ),

      views AS (
        SELECT
          viewed_at::date AS day,
          COUNT(*)::int AS count
        FROM recipe_views
        WHERE viewed_at >= CURRENT_DATE - INTERVAL '6 days'
        GROUP BY viewed_at::date
      ),

      recipes AS (
        SELECT
          created_at::date AS day,
          COUNT(*)::int AS count
        FROM recipes
        WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
        GROUP BY created_at::date
      )

      SELECT
        TO_CHAR(days.day, 'YYYY-MM-DD') AS date,
        COALESCE(views.count, 0)::int AS views,
        COALESCE(recipes.count, 0)::int AS recipes
      FROM days
      LEFT JOIN views
        ON views.day = days.day
      LEFT JOIN recipes
        ON recipes.day = days.day
      ORDER BY days.day ASC
    `),

    pool.query(`
      SELECT
        rc.id,
        rc.name,
        COUNT(r.id)::int AS count,
        CASE
          WHEN published.total = 0 THEN 0
          ELSE ROUND(
            COUNT(r.id) * 100.0 / published.total,
            1
          )
        END AS percentage
      FROM recipe_categories rc

      LEFT JOIN recipes r
        ON r.category_id = rc.id
       AND r.status = 'published'

      CROSS JOIN (
        SELECT COUNT(*)::numeric AS total
        FROM recipes
        WHERE status = 'published'
      ) published

      GROUP BY
        rc.id,
        rc.name,
        published.total

      ORDER BY count DESC, rc.name ASC
    `),

    pool.query(`
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 6
    `),

    pool.query(`
      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.title,
        r.description,
        r.cooking_time,
        r.difficulty,
        r.created_at,
        r.status,
        c.name AS cuisine_name,
        rc.name AS category_name
      FROM recipes r
      JOIN users u
        ON r.author_id = u.id
      LEFT JOIN cuisines c
        ON r.cuisine_id = c.id
      LEFT JOIN recipe_categories rc
        ON r.category_id = rc.id
      WHERE r.status = 'pending'
      ORDER BY r.created_at ASC
    `),
  ]);

  return {
    stats: {
      users: usersResult.rows[0].count,
      chefs: chefsResult.rows[0].count,
      publishedRecipes: publishedRecipesResult.rows[0].count,
      pendingRecipes: pendingRecipesResult.rows[0].count,
      rejectedRecipes: rejectedRecipesResult.rows[0].count,
    },

    activity: activityResult.rows,

    recipeCategories: categoryResult.rows,

    recipeStatus: [
      {
        status: "Published",
        count: publishedRecipesResult.rows[0].count,
      },
      {
        status: "Pending",
        count: pendingRecipesResult.rows[0].count,
      },
      {
        status: "Rejected",
        count: rejectedRecipesResult.rows[0].count,
      },
    ],

    recentUsers: recentUsersResult.rows,

    pendingRecipes: pendingRecipesResultDetailed.rows,
  };
};