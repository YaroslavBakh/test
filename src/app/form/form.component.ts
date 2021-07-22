import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private cd :ChangeDetectorRef) { }
  hobbyDuration?:string;
  hobbyName?:string;
  emails:Array<string> = ['test@test.test'];
  submitted = false;
  errorDuplicateMail:boolean = false;
  frameworks:Array<string> = ['angular', 'react', 'vue']
  version:any = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
}
actualFrameworkVersions:Array<string> = []
frameworkVersions?:string = '';
hobbies:Array<{name:string|undefined,duration:string}> = [];

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    framemowork: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),

  });
  get f() { return this.profileForm.controls; }
  get email() {return this.profileForm.controls.email}
  selectChangeHandler(event:any){
      this.actualFrameworkVersions = [...this.version[event.target.value]];
      this.cd.detectChanges()
    
  }
  selectChangeVersion(event:any){
    this.frameworkVersions = event.target.value
  }
  addHobby(event:any){
    this.hobbies.push({name: this.hobbyName, duration: `${this.hobbyDuration} month`})
    this.hobbyName = '';
    this.hobbyDuration = '';
  }

  checkEmail(email:any){
    return new Promise(resolve => {
      setTimeout(() => {
        if(this.emails.includes(email)){
          resolve(false)
        }      
        resolve(true);
      }, 2000);
    });
  }
  ngOnInit(): void {
  }
  async onSubmit(){
    const {firstName,lastName,dateOfBirth,framemowork,email }  = this.profileForm.controls;
    this.submitted = true;
    const emailChecked = <boolean>await this.checkEmail(email.value);
    if(!emailChecked){
      this.errorDuplicateMail = true;
    }
    if (this.profileForm.invalid) {
      return;
  }
  
  this.errorDuplicateMail = false;
    let frontEndDeveloper = {
      firstName:firstName.value,
      lastName:lastName.value,
      dateOfBirth:dateOfBirth.value,
      framemowork:framemowork.value,
      frameworkVersions:this.frameworkVersions,
      email:email.value,
      hobby:this.hobbies
    }
    console.log(frontEndDeveloper)
  }
}
