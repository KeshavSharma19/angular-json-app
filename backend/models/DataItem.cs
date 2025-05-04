// Models/DataItem.cs
using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Property
    {
        public object Value { get; set; }
        public string Label { get; set; }
    }

    public class Data
    {
        public DateTime SamplingTime { get; set; }
        public List<Property> Properties { get; set; }
    }

    public class DataItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Data> Datas { get; set; }
    }
}
