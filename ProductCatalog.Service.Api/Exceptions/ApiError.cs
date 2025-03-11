using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Exceptions;

public class ApiError
{
    public ApiError()
    {
        
    }

    public ApiError(Exception e)
    {
        Message = e.Message;
        StackTrace = e.StackTrace;
        InnerException = e.InnerException;
    }

    public string Message { get; set; }
    public string StackTrace { get; set; }
    public string InnerException { get; set; }
}
