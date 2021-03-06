import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-selfuse',
  templateUrl: './selfuse.component.html',
  styleUrls: ['./selfuse.component.less']
})
export class SelfuseComponent implements OnInit {

  @Input() commodityInfo;

  formGroup: FormGroup;

  employeeList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>
  ) {
    this.http.post('/member/getStoreTeachers').then(res => this.employeeList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [{ value: this.commodityInfo.name, disabled: true }],
      stockPrice: [{ value: this.commodityInfo.stockPrice, disabled: true }],
      price: [{ value: this.commodityInfo.price, disabled: true }],
      dqstock: [{ value: this.commodityInfo.stock, disabled: true }],
      selfUse: [{ value: this.commodityInfo.selfUse, disabled: true }],
      introduction: [{ value: this.commodityInfo.introduction, disabled: true }],

      stock: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      employeeId: [, [Validators.required]],
      password: [, [Validators.required]]
    })
  }

  saveLoading: boolean;
  @DrawerSave('/commodity/saveStock') save: () => void;
  @DrawerClose() close: () => void;
}
