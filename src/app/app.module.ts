import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { ScatterchartComponent } from './scatterchart/scatterchart.component';
import { CalculatorComponent } from './calculator/calculator.component';



@NgModule({
  declarations: [
    AppComponent,
    ScatterchartComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HighchartsChartModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
