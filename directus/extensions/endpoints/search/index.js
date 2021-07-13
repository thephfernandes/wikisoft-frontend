module.exports = function registerEndpoint(
  router,
  { services, exceptions, database, getSchema, env }
) {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;

  router.get("/", redirect);
  router.get("/:type/", get_type);
  router.get("/:type/:query/", search);
  router.get("/:type/:query/:sort/", search);
  router.get("/:type/:query/:sort/:filter/", search);
  router.get("/:type/:query/:sort/:filter/:page/", search);

  function redirect(req, res, next) {
    res.redirect("https://www.wikiprofile.com");
  }

  function get_type(req, res, next) {
    const type = req.params.type;

    database
      .withSchema("search")
      .column({
        type: "pluralis",
        filters: "filters",
      })
      .select()
      .from("types")
      .where("pluralis", "=", type)
      .then((result) => res.json(result));
  }

  function search(req, res, next) {
    const query = req.params.query || "";
    const type = req.params.type || "companies";
    const sort = req.params.sort || "DESC";
    const filters = req.params.filters || [];
    const page = req.params.page || 1;
    const pageLimit = 20;

    database
      .withSchema("search")
      .column({
        id: "id",
        content: "content",
      })
      .select()
      .from("items")
      .whereRaw(
        `items."search-all" @@ websearch_to_tsquery('simple', '${query}')`
      )
      .andWhere("type", "=", query)
      .limit(pageLimit)
      .offset(page - 1)
      .then((results) => res.json(results));
  }
};
