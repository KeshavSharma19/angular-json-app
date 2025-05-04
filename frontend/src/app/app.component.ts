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
      this.data = res;
      console.log('Data received:', this.data);
      this.selectedProperties = this.data.Datas[0];
      console.log(this.selectedIndex)
      console.log('Selected Properties:', this.selectedProperties);
      this.buildTableHeaders();
    });
  }
  getPropertyValue(item: any, header: string): string {
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
    const updatedData = { ...this.data };
    this.dataService.updateData(updatedData).subscribe((response) => {
      console.log('Data saved successfully:', response);
    });
  }
  selectedIndex : number = 0;
  selectedData(e: any, index: number) {
    console.log(e , index)
    this.selectedIndex = index;
    console.log('Selected data:', e);

    this.selectedProjectData = e;
    console.log(this.selectedProjectData);
  }
}
