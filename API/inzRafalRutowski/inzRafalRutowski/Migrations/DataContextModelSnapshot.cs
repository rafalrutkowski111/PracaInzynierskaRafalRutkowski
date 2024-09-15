﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using inzRafalRutowski.Data;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

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

                    b.Property<Guid>("EmployeeId")
                        .HasColumnType("uniqueidentifier");

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

                    b.Property<bool>("Admin")
                        .HasColumnType("bit");

                    b.Property<bool>("ConfirmEmail")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

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

                    b.Property<string>("ExperienceName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExperienceValue")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Experiences");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CurrentTimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<string>("Estimate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ListEmployeeAddToJob")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeStartJob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isEstimate")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.JobEmployee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<Guid>("EmployeeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<int?>("ExperienceId")
                        .HasColumnType("int");

                    b.Property<bool>("IsNeed")
                        .HasColumnType("bit");

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.Property<int>("SpecializationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeStartJob")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("JobId");

                    b.ToTable("JobEmployees");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.JobHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CurrentTimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Estimate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.Property<string>("ListEmployeeAddToJob")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeAddHistory")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeFinishJob")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeStartJob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isEstimate")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("JobId");

                    b.ToTable("JobHistorys");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Specialization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("EmployerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Specializations");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.EmployeeAnother", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsEmployed")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmployeeAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.EmployeeSpecializationAnother", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<Guid>("EmployeeAnotherId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ExperianceAnotherId")
                        .HasColumnType("int");

                    b.Property<int>("SpecializationAnotherId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeAnotherId");

                    b.HasIndex("ExperianceAnotherId");

                    b.HasIndex("SpecializationAnotherId");

                    b.ToTable("EmployeeSpecializationAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.ExperianceAnother", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ExperienceName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExperienceValue")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ExperianceAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.SpecializationAnother", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SpecializationAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employer", "Employer")
                        .WithMany("Employees")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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

            modelBuilder.Entity("inzRafalRutowski.Models.JobEmployee", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employee", "Employee")
                        .WithMany("JobEmployees")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("inzRafalRutowski.Models.Job", "Job")
                        .WithMany("JobEmployees")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Job");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.JobHistory", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Job", "Job")
                        .WithMany("JobHistories")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Specialization", b =>
                {
                    b.HasOne("inzRafalRutowski.Models.Employer", "Employer")
                        .WithMany("Specializations")
                        .HasForeignKey("EmployerId");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.EmployeeSpecializationAnother", b =>
                {
                    b.HasOne("inzRafalRutowski.ModelsAnother.EmployeeAnother", "EmployeeAnother")
                        .WithMany("EmployeeSpecializationAnothers")
                        .HasForeignKey("EmployeeAnotherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("inzRafalRutowski.ModelsAnother.ExperianceAnother", "ExperianceAnother")
                        .WithMany("EmployeeSpecializationAnothers")
                        .HasForeignKey("ExperianceAnotherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("inzRafalRutowski.ModelsAnother.SpecializationAnother", "SpecializationAnother")
                        .WithMany("EmployeeSpecializationAnothers")
                        .HasForeignKey("SpecializationAnotherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployeeAnother");

                    b.Navigation("ExperianceAnother");

                    b.Navigation("SpecializationAnother");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employee", b =>
                {
                    b.Navigation("EmployeeSpecializations");

                    b.Navigation("JobEmployees");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Employer", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Experiences");

                    b.Navigation("Jobs");

                    b.Navigation("Specializations");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Job", b =>
                {
                    b.Navigation("JobEmployees");

                    b.Navigation("JobHistories");
                });

            modelBuilder.Entity("inzRafalRutowski.Models.Specialization", b =>
                {
                    b.Navigation("EmployeeSpecializations");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.EmployeeAnother", b =>
                {
                    b.Navigation("EmployeeSpecializationAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.ExperianceAnother", b =>
                {
                    b.Navigation("EmployeeSpecializationAnothers");
                });

            modelBuilder.Entity("inzRafalRutowski.ModelsAnother.SpecializationAnother", b =>
                {
                    b.Navigation("EmployeeSpecializationAnothers");
                });
#pragma warning restore 612, 618
        }
    }
}
