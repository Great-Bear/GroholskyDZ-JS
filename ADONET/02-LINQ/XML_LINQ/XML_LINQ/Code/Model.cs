using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;

namespace XML_LINQ.Code
{
    class Model
    {
        public string Path { get; set; }
        public Model(string path)
        {
            Path = path;
        }
        public List<string> FindElements() 
        {
            List<string> nameElems = new List<string>();
            XDocument xdoc = XDocument.Load(Path);
            foreach (XElement phoneElement in xdoc.Element("PreciousStones").Elements("PreciousStone"))
            {
                foreach (var nameElem in phoneElement.Elements())
                {
                    if (nameElems.Contains(nameElem.Name.ToString()))
                    {
                        continue;
                    }
                    nameElems.Add(nameElem.Name.ToString());
                } 
            }
            return nameElems;
        }

        public List<string> FindElemValueElem(string elemName,string value)
        {
            List<string> resultElem = new List<string>();
            XDocument xdoc = XDocument.Load(Path);
            foreach (XElement item in xdoc.Element("PreciousStones").Elements("PreciousStone")) 
            {
                foreach (var elem in item.Elements())
                {
                    if(elem.Name.ToString() == elemName) 
                    {
                        if(string.Compare(elem.Value.ToString(), value,true) == 0 )
                        {
                            resultElem.Add(item.Element("name").Value.ToString());
                        }
                        break;                      
                    }
                }
            }
            if(resultElem.Count == 0) 
            {
                resultElem.Add("No result");
            }
            return resultElem;
        }
    }
}
