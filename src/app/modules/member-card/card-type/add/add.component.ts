import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() id;

  @Input() cardTypeInfo: any = {};

  formGroup: FormGroup;

  cardBusinessList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
    this.http.post('/cardBusinessManagement/findList', {}, false).then(res => this.cardBusinessList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      name: [this.cardTypeInfo.name, [Validators.required]],
      categoryId: [this.cardTypeInfo.categoryId, [Validators.required]],
      effectMonth: [this.cardTypeInfo.effectMonth, [Validators.required]],
      feeType: [this.cardTypeInfo.feeType, [Validators.required]],
      times: [this.cardTypeInfo.times, [Validators.required]],
      freeTimes: [this.cardTypeInfo.freeTimes, [Validators.required]],
      balance: [this.cardTypeInfo.balance, [Validators.required]],
      openPoints: [this.cardTypeInfo.openPoints, [Validators.required]],
      tong: [this.cardTypeInfo.tong || false],
      withdrawAmount: [this.cardTypeInfo.withdrawAmount, [Validators.required]],
      comment: [this.cardTypeInfo.comment]
    });
  }

  saveLoading: boolean;
  @DrawerSave('/cardTypeManagement/modify') save: () => void;

  @DrawerClose() close: () => void;

}
