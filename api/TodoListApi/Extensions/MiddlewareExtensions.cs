namespace TodoListApi.Extensions
{
    public static class MiddlewareExtensions
    {
        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            app.UseForwardedHeaders();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TodoList API V1");
                c.RoutePrefix = "api/swagger";
            });

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            return app;
        }
    }
}