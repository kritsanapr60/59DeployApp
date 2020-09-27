import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/form/form.service';
import { LineloginService } from 'src/app/services/linelogin.service';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../../form/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-read-consent',
  templateUrl: './read-consent.component.html',
  styleUrls: ['./read-consent.component.less'],
})
export class ReadConsentComponent implements OnInit {
  consentId: string;
  consentAttributes: Object;
  versionConsent: number;
  titleConsent: string;
  option: string;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private line: LineloginService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    const params = this.route.snapshot.paramMap;
    this.option = params.get('option');
    this.consentId = params.get('docID');
    console.log(params.get('option'));
  }

  ngOnInit(): void {
    if (this.option === 'readConsent') {
      this.formService.readConsent(this.consentId).subscribe((item) => {
        this.consentAttributes = item.attributes;
        this.titleConsent = item.title;
        this.versionConsent = item['version'];
      });
    } else {
      console.log('creator', this.consentId, 'consent id', this.option);

      this.formService
        .readUserConsent(this.option, this.consentId)
        .subscribe((item) => {
          try {
            // Read data form UserForm2 Collection via FormService
            console.log(
              `Data Form Collection UserForm =
              Attributes : ${item['attributes']}
              Title : ${item['title']}
              Version : ${item['version']}
              userUID : ${this.line.userUID}
            `
            );

            // Keep value in variable 
            this.titleConsent = item['title'];
            this.consentAttributes = item['attributes'];
            this.versionConsent = item['version'];

            // Send data to FormServive to editSubUserConsentVersion Function
            this.formService.editSubUserConsentVersion(
              this.line.userUID,
              this.consentId,
              this.titleConsent,
              this.consentAttributes,
              this.versionConsent
            );
            console.log('----', item);
          } catch (err) {
            console.log(`Error Massage : ${err}`);
          }
        });
    }
  }
  // this.formService.readConsent(this.consentId).subscribe((item) => {
  //   this.consentAttributes = item.attributes;
  //   this.titleConsent = item.title;
  //   this.versionConsent = item['version'];
  //   this.creator = item['creator'];
  //   console.log('--------------------');
  //   console.log(this.consentAttributes);
  //   console.log(this.titleConsent);
  //   console.log(this.creator);
  //   console.log(this.versionConsent);
  // });

  submit() {
    let status = 'ok';
    console.log(this.consentAttributes);
    for (const index in this.consentAttributes) {
      const property = this.consentAttributes[index];
      if (property.type === 'session') {
        property.children[2].children.forEach((element) => {
          if (property.value === 'ไม่ยอมรับ' && element.required) {
            status = 'no';
            console.log('ไม่ให้ผ่านหรอก');
          }
        });
      }
    }

    if (status === 'no') {
      const message = `หากไม่ยอมรับ จะไม่สามารถใช้บริการได้`;

      const dialogData = new ConfirmDialogModel('คำเตือน !!!', message);

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      });

      dialogRef.afterClosed().subscribe((dialogResult) => {
        console.log(dialogResult);
        // this.result = dialogResult;
        // if (this.result) {
        //   this.model.attributes.splice(i, 1);
        // }
      });
    } else if (status === 'ok') {
      console.log(
        'Else Condition',
        this.consentId,
        this.consentAttributes,
        'version',
        this.versionConsent,
        this.titleConsent
      );
      if (this.option === 'readConsent') {
        this.formService.addUserConsent(
          this.line.userUID,
          this.consentId,
          this.consentAttributes,
          this.versionConsent = 1,
          this.titleConsent
        );
        } else {
          this.formService.editUserConsent(
            this.line.userUID,
            this.consentId,
            this.titleConsent,
            this.consentAttributes,
            this.versionConsent
          );
        }
      // this.formService.addUserConsent(
      //   this.line.userUID,
      //   this.consentId,
      //   this.consentAttributes,
      //   this.versionConsent,
      //   this.titleConsent
      // );
      console.log('user uid consent', this.line.userUID);
      if (this.option === 'readConsent') {
        return this.router.navigate(['/userform', this.consentId]);
      }
      else {
        return this.router.navigate(['/edituserform', this.consentId]);
      }
    }
  }
}
