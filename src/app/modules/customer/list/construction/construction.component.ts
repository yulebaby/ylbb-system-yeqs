import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {
  
  datalabelList: any = [];
  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;

  cardTypeList: any[] = [];
  salesList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService,
    private drawerRef: NzDrawerRef
  ) { 
    this.http.post('/cardTypeManagement/findList', {}, false).then(res => this.cardTypeList = res.result);
    this.http.post('/member/getStoreSales', {}, false).then(res => this.salesList = res.result);
  }

  ngOnInit() {
    let formControls: any = {
      memberId: [this.id],
      cardCode: [, [Validators.required, Validators.maxLength(30)]],
      cardTypeId: [, [Validators.required]],
      memberName: [this.userInfo.name, [Validators.required]],
      protocol:[],
      employee_name:[],
      card_price:[],
      times: [],
      freeTimes: [],
      usedTimes: [0],
      balance: [],
      openPoints: [],
      effectDate: [],
      expireDate: [],
      turnCard: [],
      withdrawAmount: [],
      salesId:  [, [Validators.required]],
      contractNo:  [, [Validators.required]],
      comment: []
    }
    if (!this.userInfo.memberCard) {
      formControls.serialNumber = [];
    }
    this.formGroup = this.fb.group(formControls);
    this.formGroup.get('cardTypeId').valueChanges.subscribe(id => {
      this.http.post('/cardTypeManagement/getCardType', { id }, false).then(res => {
        this.formGroup.patchValue(res.result);
      })
    })
  }


  @DrawerClose() close: () => void;
  saveLoading: boolean;
  save() {
      if (this.formGroup.invalid) {
        for (let i in this.formGroup.controls) {
          this.formGroup.controls[i].markAsDirty();
          this.formGroup.controls[i].updateValueAndValidity();
        }
      } else {
        if (!this.userInfo.memberCard && !this.formGroup.value.serialNumber) {
          this.modal.confirm({
            nzTitle: '<i>您确定要建卡吗?</i>',
            nzContent: '<b>没有输入卡序列号，此卡为非实体卡，确认创建？</b>',
            nzOnOk: () => this.createCard(),
            nzOnCancel: () => this.saveLoading = false
          });
        } else {
          this.createCard();
        }
      }
  }

  /* -------------------- 建卡请求 -------------------- */
  createCard() {
    this.saveLoading = true;
    this.http.post('/member/createCard', {
      paramJson: JSON.stringify(this.formGroup.value)
    }).then(res => this.drawerRef.close({ memberId: this.id }));
  }

}
