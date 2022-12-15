using CsvHelper;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.Globalization;
using System.Reflection.PortableExecutable;
using System.Text.Json;
using static System.Reflection.Metadata.BlobBuilder;

namespace backend
{
    public class DatabaseFunctions
    {
        //SignUp Functions
        public Object SignUpFunction(IDictionary<string, string> SignUpBody)
        {
            User user;

            using (var reader = new StreamReader("data\\users.csv"))
            using (var csvRead = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                try
                {
                    var records = csvRead.GetRecords<User>().ToList();
                    foreach (var item in records)
                    {
                        if (item.Email.Equals(SignUpBody["email"]))
                        {
                            return null;
                        }
                    };
                }
                catch(NullReferenceException ex)
                {
                    throw ex;
                }
                reader.Close();

            }
            using (var writer = new StreamWriter("data\\users.csv", true))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Email = SignUpBody["email"],
                    Username = SignUpBody["username"],
                    Password = BCrypt.Net.BCrypt.HashPassword(SignUpBody["password"]),
                    LastLogin = null,
                    LoginCount = 0
                };

                csv.WriteRecord(user);
                csv.NextRecord();
                csv.Flush();
            }

            return user;
        }
        //Login Functions
        public Object LoginFunction(IDictionary<string, string> LoginBody)
        {
            User foundUser = null;
            User changedUser = new User();
            List<User> records = new List<User>();
            using (var reader = new StreamReader("data\\users.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {              
                records = csv.GetRecords<User>().ToList();
                foreach (var item in records)
                {
                    var isPasswordVerify = BCrypt.Net.BCrypt.Verify(LoginBody["password"], item.Password);
                    if (item.Email.Equals(LoginBody["email"]) && isPasswordVerify)
                    {
                        item.LoginCount++;
                        changedUser = item;
                        foundUser = new User();
                        foundUser.Id = item.Id;
                        foundUser.Email = item.Email;
                        foundUser.Username = item.Username;
                        foundUser.Password = item.Password;
                        foundUser.LoginCount = item.LoginCount;
                        foundUser.LastLogin = item.LastLogin;

                        break;
                    }
                }
                if (foundUser == null)
                {
                    return null;
                }
            }
            using (var writer = new StreamWriter("data\\users.csv", false))
            using (var csvWrite = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                changedUser.LastLogin = DateTime.Now.ToShortDateString();
                csvWrite.WriteRecords(records);
            }

            return foundUser;
        }
        //LanguageUpdate Functions
        public Object LanguageUpdateFunction(IDictionary<string, string> LanguageUpdateBody)
        {
            var currentLanguage = LanguageUpdateBody["Language"];
            IDictionary<string, string> LanguageObject = new Dictionary<string, string>();



            using (var reader = new StreamReader("data\\Languages.csv"))
            using (var csvRead = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                try
                {
                    var records = csvRead.GetRecords<Language>().ToList();
                    if (currentLanguage == "English")
                    {
                        foreach (var item in records)
                        {
                            LanguageObject.Add(item.Tag, item.English);
                        }
                    }
                    else
                    {
                        foreach (var item in records)
                        {
                            LanguageObject.Add(item.Tag, item.Hebrew);
                        }
                    }
                }
                catch (NullReferenceException ex)
                {
                    throw ex;
                }
                reader.Close();

            };
            return LanguageObject;
        }
    }
}
