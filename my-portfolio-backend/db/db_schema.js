schema = {
  tables: [
    {
      name: "projects",
      columns: [
        { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
        { name: "title", type: "TEXT NOT NULL" },
        { name: "description", type: "TEXT" },
        { name: "image", type: "TEXT" },
        { name: "image2", type: "TEXT" },
        { name: "image3", type: "TEXT" },
        { name: "github_link", type: "TEXT" },
        { name: "live_link", type: "TEXT" },
        { name: "tags", type: "TEXT" },
        { name: "starting_date", type: "TEXT" }, // ISO date string (e.g., "2023-01-15")
        { name: "finished_date", type: "TEXT" }, // ISO date string (e.g., "2023-03-10")
        { name: "timespan", type: "INTEGER" }, // Total days (e.g., 55)
        { name: "hours_per_day", type: "INTEGER" }, // Hours per day (e.g., 3)
        { name: "reason", type: "TEXT" },
        { name: "learned_things", type: "TEXT" },
        { name: "key_features", type: "TEXT" },
        { name: "notes", type: "TEXT" },
      ],
    },
    {
      name: "certificates",
      columns: [
        { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
        { name: "title", type: "TEXT NOT NULL" },
        { name: "issuer", type: "TEXT NOT NULL" },
        { name: "date", type: "TEXT" }, // ISO date string (e.g., "2024-01-15")
        { name: "image", type: "TEXT" },
        { name: "link", type: "TEXT" },
        { name: "description", type: "TEXT" },
        { name: "type", type: "TEXT" },
        { name: "skills", type: "TEXT" },
      ],
    },
  ],
};

module.exports = schema;
