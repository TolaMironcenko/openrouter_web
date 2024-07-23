import { Routes, Router } from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {SyslogComponent} from "./syslog/syslog.component";
import {SettingsComponent} from "./settings/settings.component";
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {inject} from "@angular/core";

function redirectifnotlogin() {
  let authservice = inject(AuthService)
  let router = inject(Router);
  if (authservice.isLoggedIn()) {
    return '/info'
  }
  return '/login'
}

export const routes: Routes = [
  { path: '', redirectTo: redirectifnotlogin, pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent, canActivate: [authGuard] },
  { path: 'syslog', component: SyslogComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
];
