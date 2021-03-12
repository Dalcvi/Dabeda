using System;
using System.Runtime.Serialization;

namespace Users.Core.CustomExceptions
{
    public class UnableToCreateAProgram : Exception
    {
        public UnableToCreateAProgram()
        {
        }

        public UnableToCreateAProgram(string message) : base(message)
        {
        }

        public UnableToCreateAProgram(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnableToCreateAProgram(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
