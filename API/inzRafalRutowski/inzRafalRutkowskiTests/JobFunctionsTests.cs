using inzRafalRutowski.Class;
using inzRafalRutowski.Models;
using System;
using System.Data;

namespace inzRafalRutkowskiTests
{
    public class Tests
    {
        private JobFunctions _jobFunctions;

        [SetUp]
        public void Setup()
        {
            _jobFunctions = new JobFunctions();
        }

        // NumberOfWorkDays
        [Test]
        [TestCase(1, 1)]
        [TestCase(7, 5)]
        public void NumberOfWorkDays_WeekendStartDay_ReturnNumberOfWorkDay(int NumberOfDays, int ExpectedNumberOfDays)
        {

            var result = _jobFunctions.NumberOfWorkDays(new DateTime(2024, 4, 22), NumberOfDays);

            Assert.That(result, Is.EqualTo(ExpectedNumberOfDays));
        }

        [Test]
        [TestCase(0)]
        [TestCase(-1)]
        public void NumberOfWorkDays_NotPositiveNumberOfDays_ThrowArgumenOutOfRange(int NumberOfDays)
        {
            Assert.That(()=> _jobFunctions.NumberOfWorkDays(new DateTime(), NumberOfDays)
                , Throws.Exception.TypeOf<ArgumentOutOfRangeException>());
        }

        [Test]
        [TestCase("2024/4/20")] // Saturday
        [TestCase("2024/4/21")] //Sunday
        public void NumberOfWorkDays_WeekendStartDay_ThrowArgumenOutOfRange(DateTime start)
        {
            Assert.That(() => _jobFunctions.NumberOfWorkDays(start, 10)
                , Throws.Exception.TypeOf<ArgumentOutOfRangeException>());
        }
    }
}