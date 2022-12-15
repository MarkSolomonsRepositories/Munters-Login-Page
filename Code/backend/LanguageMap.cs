using CsvHelper.Configuration;

namespace backend
{
    public class LanguageMap : ClassMap<Language>
    {
        public LanguageMap()
        {
            Map(m => m.Tag).Index(0).Name("Tag");
            Map(m => m.English).Index(0).Name("English");
            Map(m => m.Hebrew).Index(1).Name("Hebrew");
        }
    }
}