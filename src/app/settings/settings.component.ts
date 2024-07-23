import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  activeTelnetBody = false
  activeDnsBody = false
  activeSshBody = false
  activeWifiBody = false
  // telnetcontrol = new FormControl()
  telnetenabled = false
  telnetport = ""

  toggletelnetbody() {
    this.activeTelnetBody = !this.activeTelnetBody;
  }

  togglednsbody() {
    this.activeDnsBody = !this.activeDnsBody;
  }

  togglesshbody() {
    this.activeSshBody = !this.activeSshBody;
  }

  togglewifibody() {
    this.activeWifiBody = !this.activeWifiBody;
  }

  getTelnetEnabled() {
    fetch([window.location.origin, 'api', 'settings', 'telnet', 'get'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}"}`
    }).then(res => res.json()).then(jsondata => {
      if (jsondata.enabled === '1') {
        this.telnetenabled = true
        return;
      } else {
        this.telnetenabled = false
      }
    }).catch((error) => {

    })
  }

  getTelnetPort() {
    fetch([window.location.origin, 'api', 'settings', 'telnet', 'port', 'get'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}"}`
    }).then(data => data.json()).then(jsondata => {
      this.telnetport = jsondata.port
    }).catch((error) => {
      // notification(`Ошибка на сервере: ${error}`, "error")
    })
  }

  ngOnInit() {
    this.getTelnetEnabled()
    this.getTelnetPort()
  }
}
