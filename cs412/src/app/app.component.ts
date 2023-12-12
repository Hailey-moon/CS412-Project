import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import mockData from './mock-data.json';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from './query.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'cs412';
  data = mockData;
  showData = false;

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(private queryService: QueryService) { }

  fetchData() {
    if (this.searchForm.valid) {
      const searchTerm = this.searchForm.value.searchTerm;
      this.queryService.fetchData(searchTerm).subscribe(
        data => {
          this.data = data;
          this.showData = true;
        },
        error => console.error(error)
      );
    }
  }
}
