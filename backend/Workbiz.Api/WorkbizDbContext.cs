 using Microsoft.EntityFrameworkCore;
  namespace Workbiz.Api; 
  public class WorkbizDbContext : DbContext { public WorkbizDbContext(DbContextOptions<WorkbizDbContext> options) : base(options) { } public DbSet<Usuario> Usuarios => Set<Usuario>(); }