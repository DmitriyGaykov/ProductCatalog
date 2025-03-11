using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Utils.Pagination;

public class SkipLimitExtractor
{
    public static (int, int) ExtractSkipAndLimitFrom(string? s_page, string? s_limit)
    {
        if (s_page is null || !int.TryParse(s_page, out var page) || page <= 0)
            page = 1;

        if (s_limit is null || !int.TryParse(s_limit, out var limit) || limit <= 0)
            limit = 25;

        var skip = (page - 1) * limit;
        return (skip, limit);
    }
}
