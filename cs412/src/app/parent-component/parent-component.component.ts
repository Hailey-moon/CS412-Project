import { Component } from '@angular/core';
import { QueryService } from './query.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  data: any[];

  constructor(private queryService: QueryService) { }

  onSearch(searchTerm: string) {
    this.queryService.fetchData(searchTerm).subscribe(
      data => this.data = data,
      error => console.error(error)
    );
  }
}
