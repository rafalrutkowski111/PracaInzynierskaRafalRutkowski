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
        public void NumberOfWorkDays_WhenColled_ReturnNumberOfWorkDay(int NumberOfDays, int ExpectedNumberOfDays)
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

        // NewDateEnd

        [Test]
        [TestCase("2024/4/15", 1, "2024/4/15")] // 1 dzien czyli tego samego sie zakonczy
        [TestCase("2024/4/15", 7, "2024/4/23")] // 7 dni roboczych, czyli za 9 dni wliczajac dzisiejszy (pomijamy weekend)
        public void NewDateEnd_WhenColled_Return_NewDateEnd(DateTime start, int NumberOfDays, DateTime ExpectedEnd)
        {

            var result = _jobFunctions.NewDateEnd(start, NumberOfDays);

            Assert.That(result, Is.EqualTo(ExpectedEnd));
        }

        [Test]
        [TestCase(0)]
        [TestCase(-1)]
        public void NewDateEnd_NotPositiveNumberOfDays_ThrowArgumenOutOfRange(int NumberOfDays)
        {
            Assert.That(() => _jobFunctions.NewDateEnd(new DateTime(), NumberOfDays)
                , Throws.Exception.TypeOf<ArgumentOutOfRangeException>());
        }

        [Test]
        [TestCase("2024/4/20")] // Saturday
        [TestCase("2024/4/21")] //Sunday
        public void NewDateEnd_WeekendStartDay_ThrowArgumenOutOfRange(DateTime start)
        {
            Assert.That(() => _jobFunctions.NewDateEnd(start, 10)
                , Throws.Exception.TypeOf<ArgumentOutOfRangeException>());
        }
    }
}