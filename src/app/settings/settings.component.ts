import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgForOf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  activeSshBody: boolean = false
  activeWifiBody: boolean = false

  telnetenabled: boolean = false
  telnetport: string = ""

  dnsEnabled: boolean = false
  dnsServers: string[] = []

  toggleTelnetEnabled(): void {
    this.telnetenabled = !this.telnetenabled;
  }

  toggleDnsEnabled(): void {
    this.dnsEnabled = !this.dnsEnabled;
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

  getDnsEnabled(): void {
    fetch([window.location.origin, 'api', 'settings', 'dns', 'get'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}"}`
    }).then(res => res.json()).then(jsondata => {
      if (jsondata.enabled === '1') {
        this.dnsEnabled = true
        return;
      } else {
        this.dnsEnabled = false
      }
    }).catch((error) => {
    })
  }

  setDnsEnabled(): void {
    fetch([window.location.origin, 'api', 'settings', 'dns', 'set'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}","enabled":"${this.dnsEnabled?1:0}"}`
    }).then(res => res.json()).then(jsondata => {
      if (jsondata.enabled === '1') {
        this.dnsEnabled = true
      }
    }).catch((error) => {
    })
  }

  getDnsServers(): void {
    fetch([window.location.origin, 'api', 'settings', 'dns', 'servers', 'get'].join('/'), {
      method: 'POST',
      body: `{"token":"${localStorage.getItem("token")}"}`
    }).then(res => res.json()).then(jsondata => {
      this.dnsServers = jsondata.servers
    }).catch((error) => {
    })
  }

  setDnsSettings(): void {
    if (confirm("Confirm DNS settings?")) {
      this.setDnsEnabled();
    }
  }

  ngOnInit() {
    this.getTelnetEnabled()
    this.getTelnetPort()

    this.getDnsEnabled()
    this.getDnsServers()
  }
}
