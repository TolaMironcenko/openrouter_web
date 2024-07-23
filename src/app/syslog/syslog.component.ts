import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "../components/navbar/navbar.component";
import { SyslogService } from "./syslog.service";

@Component({
  selector: 'app-syslog',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './syslog.component.html',
  styleUrl: './syslog.component.css'
})
export class SyslogComponent implements OnInit {
  syslogService: SyslogService = inject(SyslogService);
  syslogdata: string = ""

  getSyslogData() {
    this.syslogService.getSyslog()
      .subscribe((data: any) => {
        console.log(data);
        this.syslogdata = data;
        this.syslogdata = this.syslogdata.replace(/\n/g,'<br>')
      });
  }

  async getSyslogDataOpenrouterFilter() {
    this.syslogService.getSyslog()
      .subscribe((data: any) => {
        console.log(data);
        this.syslogdata = data;
        this.syslogdata = this.syslogdata.replace(/\n/g,'<br>')
        let syslogalldata = this.syslogdata.split('<br>')
        console.log(syslogalldata)
        syslogalldata = syslogalldata.filter(syslogalldatadata => {
          return syslogalldatadata.includes('openrouter:')
        })
        this.syslogdata = ""
        for (const data in syslogalldata) {
          this.syslogdata += syslogalldata[data] + "<br>"
        }
        console.log(this.syslogdata, syslogalldata)
      });
  }

  getSyslogDataAuthServiceFilter() {
    this.syslogService.getSyslog()
      .subscribe((data: any) => {
        console.log(data);
        this.syslogdata = data;
        this.syslogdata = this.syslogdata.replace(/\n/g, '<br>')
        let syslogalldata = this.syslogdata.split('<br>')
        console.log(syslogalldata)
        syslogalldata = syslogalldata.filter(syslogalldatadata => {
          return syslogalldatadata.includes('auth_service:')
        })
        this.syslogdata = ""
        for (const data in syslogalldata) {
          this.syslogdata += syslogalldata[data] + "<br>"
        }
        console.log(this.syslogdata, syslogalldata)
      });
  }

  ngOnInit() {
    this.getSyslogData()
  }
}
