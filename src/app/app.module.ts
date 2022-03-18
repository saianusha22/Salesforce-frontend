import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
