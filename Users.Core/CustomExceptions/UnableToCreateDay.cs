using System;
using System.Runtime.Serialization;

namespace Users.Core.CustomExceptions
{
    public class UnableToCreateDay : Exception
    {
        public UnableToCreateDay()
        {
        }

        public UnableToCreateDay(string message) : base(message)
        {
        }

        public UnableToCreateDay(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnableToCreateDay(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
