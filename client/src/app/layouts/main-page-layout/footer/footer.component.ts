import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('sq');
  }

  ngOnInit() {
    document.getElementById('year').innerHTML = new Date().getFullYear().toFixed(0);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
