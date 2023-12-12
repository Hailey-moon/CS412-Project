import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  submitForm() {
    if (this.searchForm.valid) {
      this.searchEvent.emit(this.searchForm.value.searchTerm);
    }
  }
}
