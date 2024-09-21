import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../Models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  score = 0;

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient)


  contactsForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    age : new FormControl<string>(''),
    q1 : new FormControl<boolean>(false),
    q2 : new FormControl<boolean>(false),
    q3 : new FormControl<boolean>(false),
    q4 : new FormControl<boolean>(false),
    q5 : new FormControl<boolean>(false),
    q6 : new FormControl<boolean>(false),
    q7 : new FormControl<boolean>(false),
    q8 : new FormControl<boolean>(false),
    q9 : new FormControl<boolean>(false),
    q10 : new FormControl<boolean>(false),
    q11: new FormControl<boolean>(false),
    q12: new FormControl<boolean>(false),
    q13: new FormControl<boolean>(false),
    q14: new FormControl<boolean>(false),
    q15: new FormControl<boolean>(false),
    finalResult: new FormControl<boolean>(false)
  })


  calculateScore() {
    this.score = 0;

    const expectedValues: { [key: string]: boolean } = {
      q1: true,
      q2: false,
      q3: false,
      q4: false,
      q5: true,
      q6: false,
      q7: true,
      q8: false,
      q9: false,
      q10: false,
      q11: true,
      q12: false,
      q13: true,
      q14: false,
      q15: false
    };
  

    Object.keys(this.contactsForm.controls).forEach((question) => {
      if (question.startsWith('q')) {
        const userAnswer = this.contactsForm.get(question)?.value;
        const expectedAnswer = expectedValues[question];
  
       
        if (userAnswer !== expectedAnswer) {
          this.score++;
        }
      }
    });

    console.log('Score:', this.score);
    if (this.score >= 5) {
      alert('The form suggests signs of depression.');
    } else {
      alert('The form does not suggest signs of depression.');
    }
  }
  
  contacts$ = this.getContacts();

  onFormSubmit(){
    const addContactRequest = {
      firstName: this.contactsForm.value.firstName,
      lastName: this.contactsForm.value.lastName,
      email : this.contactsForm.value.email,
      age : this.contactsForm.value.age,
      q1 : this.contactsForm.value.q1,
      q2 : this.contactsForm.value.q2,
      q3 : this.contactsForm.value.q3,
      q4 : this.contactsForm.value.q4,
      q5 : this.contactsForm.value.q5,
      q6 : this.contactsForm.value.q6,
      q7 : this.contactsForm.value.q7,
      q8 : this.contactsForm.value.q8,
      q9 : this.contactsForm.value.q9,
      q10 : this.contactsForm.value.q10,
      q11 : this.contactsForm.value.q11,
      q12 : this.contactsForm.value.q12,
      q13 : this.contactsForm.value.q13,
      q14 : this.contactsForm.value.q14,
      q15 : this.contactsForm.value.q15,
      finalResult : this.contactsForm.value.finalResult
    }

    this.http.post('http://localhost:5294/Contacts', addContactRequest)
    .subscribe({
      next: (value) => {
        console.log(value);
        this.contacts$ = this.getContacts();
        
      }
    });

    this.calculateScore();
    

    alert("Form has been submitted");
  }

  onFormReset() {
    this.contactsForm.reset({
      firstName: '',
      lastName: '',
      email: null,
      age: '',
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      q6: false,
      q7: false,
      q8: false,
      q9: false,
      q10: false,
      q11: false,
      q12: false,
      q13: false,
      q14: false,
      q15: false,
      
    });
    
  }

  onDelete(id: string){
    this.http.delete(`http://localhost:5294/Contacts/${id}`)
    .subscribe({
      next: (value) => {
        alert('Form Deleted');
        this.contacts$ = this.getContacts();
      }
    })
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>("http://localhost:5294/Contacts");

  }
}
