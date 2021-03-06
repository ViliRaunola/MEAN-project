import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Täytäthän kaikki kentät!", {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Varmista, että sähköpostiosoite on kirjoitettu oikein!", {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }
    //console.log(user.password);

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("Rekisteröinti onnistui!", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("Rekisteröinti epäonnistui", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
