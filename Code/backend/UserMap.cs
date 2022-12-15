using CsvHelper.Configuration;

namespace backend
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Map(m => m.Id).Index(0).Name("Id");
            Map(m => m.Email).Index(1).Name("Email");
            Map(m => m.Username).Index(2).Name("Username");
            Map(m => m.Password).Index(3).Name("Password");
            Map(m => m.LastLogin).Index(4).Name("LastLogin");
            Map(m => m.LoginCount).Index(5).Name("LoginCount");
        }
    }
}
