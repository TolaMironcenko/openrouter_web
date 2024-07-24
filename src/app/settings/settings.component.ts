import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  activeDnsBody = false
  activeSshBody = false
  activeWifiBody = false
  telnetenabled = false
  telnetport = ""

  toggletelnetbody() {
    this.telnetenabled = !this.telnetenabled
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
    }).catch(() => {

    })
  }

  setTelnetEnabled() {
    fetch([window.location.origin, 'api', 'settings', 'telnet', 'set'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}","enabled":"${this.telnetenabled?1:0}"}`
    }).then(res => res.json()).then(jsondata => {
      if (jsondata.enabled === '1') {
        this.telnetenabled = true
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
    })
  }

  setTelnetPort() {
    fetch([window.location.origin, 'api', 'settings', 'telnet', 'port', 'set'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}","port":"${this.telnetport}"}`
    }).then(data => data.json()).then(jsondata => {
      this.telnetport = jsondata.port
    }).catch((error) => {
    })
  }

  setTelnetSettings() {
    if (confirm("Confirm telnet settings?")) {
      this.setTelnetEnabled()
      this.setTelnetPort()
    }
  }

  ngOnInit() {
    this.getTelnetEnabled()
    this.getTelnetPort()
  }
}
