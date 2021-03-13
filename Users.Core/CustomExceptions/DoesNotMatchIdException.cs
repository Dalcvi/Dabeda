using System;
using System.Runtime.Serialization;

namespace Users.Core.CustomExceptions
{
    public class DoesNotMatchIdException : Exception
    {
        public DoesNotMatchIdException()
        {
        }

        public DoesNotMatchIdException(string message) : base(message)
        {
        }

        public DoesNotMatchIdException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected DoesNotMatchIdException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
