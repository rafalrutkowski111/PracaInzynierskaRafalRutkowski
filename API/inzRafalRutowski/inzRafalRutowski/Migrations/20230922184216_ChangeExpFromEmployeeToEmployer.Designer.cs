﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using inzRafalRutowski.Data;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230922184216_ChangeExpFromEmployeeToEmployer")]
    partial class ChangeExpFromEmployeeToEmployer
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContractFinishTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("EmployerId")
                        .HasColumnType("int");

                    b.Property<double?>("HourFinishtWork")
                        .HasColumnType("float");

                    b.Property<double?>("HourStartWork")
                        .HasColumnType("float");

                    b.Property<bool>("IsEmployed")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.EmployeeSpecialization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<int>("ExperienceId")
                        .HasColumnType("int");

                    b.Property<int>("SpecializationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("SpecializationId");

                    b.ToTable("EmployeeSpecializations");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Employers");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Experience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("EmployerId")
                        .HasColumnType("int");

                    b.Property<string>("experienceName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("experienceValue")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Experience");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeStartJob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Specialization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Specializations");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employer", "Employer")
                        .WithMany("Employees")
                        .HasForeignKey("EmployerId");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.EmployeeSpecialization", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employee", "Employee")
                        .WithMany("EmployeeSpecializations")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("inzRafalRutowski.Models.Specialization", "Specialization")
                        .WithMany("EmployeeSpecializations")
                        .HasForeignKey("SpecializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Specialization");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Experience", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employer", "Employer")
                        .WithMany("Experiences")
                        .HasForeignKey("EmployerId");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Job", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employer", "Employer")
                        .WithMany("Jobs")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.Navigation("EmployeeSpecializations");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employer", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Experiences");

                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Specialization", b =>
                {
                    b.Navigation("EmployeeSpecializations");
                });
#pragma warning restore 612, 618
        }
    }
}
