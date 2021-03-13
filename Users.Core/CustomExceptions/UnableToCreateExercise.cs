using System;
using System.Runtime.Serialization;

namespace Users.Core.CustomExceptions
{
    public class UnableToCreateExercise : Exception
    {
        public UnableToCreateExercise()
        {
        }

        public UnableToCreateExercise(string message) : base(message)
        {
        }

        public UnableToCreateExercise(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnableToCreateExercise(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
