import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  data: any;
  selectedSamplingTime!: string;
  selectedProperties!: any[];
  currentView: string = 'summary'; // Default view
  allLabels: string[] = [];
  selectedProjectData: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getData().subscribe((data: any) => {
    //   console.log('Data received:', data);
    //   this.data = data;
    // });
    this.loadData();
  }
  loadData() {
    this.dataService.getData().subscribe((res: any) => {
      console.log('Data received:', res);
      this.data = res;
      const allLabelsSet = new Set<string>();
      res.Datas.forEach((item: any) => {
        item.Properties.forEach((prop: any) => {
          allLabelsSet.add(prop.Label);
        });
      });
      const allLabels = Array.from(allLabelsSet);
      res.organizedTableData = res.Datas.map((item: any) => {
        const row: any = { SamplingTime: item.SamplingTime };
        allLabels.forEach((label) => {
          const prop = item.Properties.find((p: any) => p.Label === label);
          row[label] = prop ? prop.Value : '';
        });
        return row;
      });
      this.allLabels = allLabels;
      this.selectedProperties = res.organizedTableData;
      this.buildTableHeaders();
    });
  }
  getPropertyValue(item: any, header: string): string {
    console.log('Item:', item);
    console.log('Header:', header);
    return item.Properties.find((p: any) => p.Label === header)?.Value || '';
  }
  buildTableHeaders() {
    const labelSet = new Set<string>();
    for (const item of this.data?.Datas) {
      for (const prop of item.Properties) {
        labelSet.add(prop.Label);
      }
    }
    this.allLabels = Array.from(labelSet);
  }

  selectSamplingTime(samplingTime: string): void {
    const selectedData = this.data.Datas.find(
      (item: any) => item.SamplingTime === samplingTime
    );
    this.selectedProperties = selectedData ? selectedData.Properties : [];
  }

  saveData(): void {
    const updatedData = { ...this.selectedProperties };
    this.dataService.updateData(updatedData).subscribe((response) => {
      console.log('Data saved successfully:', response);
    });
  }
  selectedIndex: number = 0;
  selectedData(e: any, index: number) {
    console.log(e, index);
    this.selectedIndex = index;
    console.log('Selected data:', e);

    this.selectedProjectData = e;
    console.log(this.selectedProjectData);
  }
}
