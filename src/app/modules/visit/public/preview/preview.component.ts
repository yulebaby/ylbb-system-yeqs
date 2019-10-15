import { DatePipe } from '@angular/common';
import { NzDrawerRef, NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { UpdateComponent } from '../update/update.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() id: number;

  @Input() followStageId: number;

  userInfo: any = {};

  followRecordGroup: FormGroup;
  remake: string;
  followRecordList: any[] = [];
  labelList: any[] = [];
  memberStatusList: any[] = [];
  followTypeList: any[] = [];
  teacherList: any[] = [];
  swimTeacherList: any[] = [];
  syllabusList: any[] = [];
  intentionStatus: boolean = false;
  memberStatusx: number = 0;
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>,
    private format: DatePipe,
    private router: Router,
    private drawer: NzDrawerService
  ) {
    /* ------------------- 客户状态 ------------------- */
    this.http.post('/common/showMemberStatus', {}, false).then(res => this.memberStatusList = res.result);
    /* ------------------- 跟进方式 ------------------- */
    this.http.post('/common/followTypeList', {}, false).then(res => this.followTypeList = res.result);
    /* ------------------- 跟进老师 ------------------- */
    this.http.post('/retrunVisit/getEmployeeList', {}, false).then(res => this.teacherList = res.result);
    /* ------------------- 预约老师 ------------------- */
    this.http.post('/tongka/teacherList', {}, false).then(res => this.swimTeacherList = res.result);
    /* ------------------- 课程列表 ------------------- */
    this.http.post('/scheduling/selectSyllabusAll', {}, false).then(res => this.syllabusList = res.result.list);
  }

  ngOnInit() {
    this.followRecordGroup = this.fb.group({
      id: [],
      content: [, [Validators.required, Validators.maxLength(200)]],
      followType: [, [Validators.required]],
      staffId: [, [Validators.required]],
      memberStatusId: [, this.followStageId == 4 ? [] : [Validators.required]],
      nextFollowTime: [, [Validators.required]],
      status: [false],
      syllabusName: [, this.memberStatusx != 5 ? [] : [Validators.required]]
    });
    // this.followRecordGroup.controls['status'].valueChanges.subscribe(res => {
    //   if (res) {
    //     this.followRecordGroup.addControl('reserveDate', this.fb.control(this.updateRecordInfo.reserveDate || null, [Validators.required]));
    //     this.followRecordGroup.addControl('reserveHour', this.fb.control(this.updateRecordInfo.reserveHour || null, [Validators.required]));
    //     this.followRecordGroup.addControl('swimTeacherId', this.fb.control(this.updateRecordInfo.swimTeacherId || null, [Validators.required]));
    //   } else {
    //     this.followRecordGroup.removeControl('reserveDate');
    //     this.followRecordGroup.removeControl('reserveHour');
    //     this.followRecordGroup.removeControl('swimTeacherId');
    //   }
    // });
    this.followRecordGroup.controls['memberStatusId'].valueChanges.subscribe(res => {
      this.memberStatusx = res;
    });
    /* ------------------- 获取用户信息 ------------------- */
    this.http.post('/customer/showCustomerInfo', { id: this.id }, false).then(res => {
      this.userInfo = res.result.member;
    });

    /* ------------------- 获取记录标签 ------------------- */
    this.http.post('/common/labelList', {}, false).then(res => {
      this.labelList = res.result;
    });

    this.getFollowRecord();
  }

  getFollowRecord() {
    /* ------------------- 查看跟进记录 ------------------- */
    this.http.post('/retrunVisit/showFollowRecord', { id: this.id }, false).then(res => {
      if (res.code == 1000) {
        this.followRecordList = res.result;
      }
      this.followRecordList.map(item => item.contentLabel = this._resetFollowRecordContent(item.content));
    });
  }

  update() {
    const drawer = this.drawer.create({
      nzTitle: '编辑客户',
      nzWidth: 720,
      nzContent: UpdateComponent,
      nzContentParams: { id: this.id }
    });
    drawer.afterClose.subscribe(res => res && this.drawerRef.close(res));
  }


  /* -------------------- 转为无意向客户 -------------------- */
  intentionCustomer(): void {
    if (!this.remake) {
      this.message.create('error', '请填写移到到无意向客户原因');
      return;
    }
    this.http.post('/retrunVisit/transitioNoIntention', { id: this.id, remake: this.remake }).then(res => {
      this.remake = null;
      this.drawerRef.close(true);
    });
  }

  /* -------------------- 发布跟进记录 -------------------- */
  saveFollowRecordLoading: boolean;
  saveFollowRecord() {
    
    if (this.followRecordGroup.invalid) {
      Object.keys(this.followRecordGroup.controls).map(key => {
        this.followRecordGroup.controls[key].markAsDirty();
        this.followRecordGroup.controls[key].updateValueAndValidity();
      });
    } else {
      this.saveFollowRecordLoading = true;
      this.userInfo.syllabusName = this.followRecordGroup.value.syllabusName;
      let params = JSON.parse(JSON.stringify(this.followRecordGroup.value));
      params.memberId = this.id;
      params.nextFollowTime = this.format.transform(params.nextFollowTime, 'yyyy-MM-dd');
      params.status = params.status ? 1 : 0;
      if (params.status === 1) {
        params.reserveDate = this.format.transform(params.reserveDate, 'yyyy-MM-dd');
        params.reserveHour = this.format.transform(params.reserveHour, 'yyyy-MM-dd HH:mm').split(' ')[1].split(':')[0];
        params.reserveMinute = this.format.transform(params.reserveHour, 'yyyy-MM-dd HH:mm').split(' ')[1].split(':')[1];
      }
      params.followStageId = this.followStageId;
      this.http.post('/retrunVisit/modifyClubFollowRecord', { paramJson: JSON.stringify(params) }).then(res => {
        if (this.memberStatusx == 5) {
          this.userInfo.previewStatus = true;
          setTimeout(() => {
            this.router.navigate(['/home/customer/settlement'], {
              queryParams: {
                userInfo: JSON.stringify(this.userInfo)
              }
            });
          }, 300);
        }
        this.saveFollowRecordLoading = false;
        if (this.updateRecordInfo.id) {
          this.updateRecordInfo = {};
          this.showUpdateRecord = false;
        }
        this.getFollowRecord();
        this.followRecordGroup.reset();
        this.drawerRef.close(true);
      }).catch(err => this.saveFollowRecordLoading = false);
    }
  }

  /* -------------------- 修改跟进记录 -------------------- */
  showUpdateRecord: boolean;
  updateRecordInfo: any = {};
  updateFollowRecord(info) {
    this.showUpdateRecord = true;
    let recordInfo = JSON.parse(JSON.stringify(info));
    recordInfo.status = recordInfo.status == 1;
    //recordInfo.reserveHour = recordInfo.reserveHour.replace(/-/g,"/");
    recordInfo.reserveHour = recordInfo.reserveHour ? new Date(`${recordInfo.reserveDate} ${recordInfo.reserveHour}:${recordInfo.reserveMinute}`) : '';
    recordInfo.reserveDate = new Date(recordInfo.reserveDate ? recordInfo.reserveDate : new Date());
    this.updateRecordInfo = recordInfo;
    this.followRecordGroup.patchValue(recordInfo);
  }

  close() {
    this.showUpdateRecord = false;
    this.updateRecordInfo = {};
    this.followRecordGroup.reset();
  }


  /* -------------------- 设置跟进记录内容标签展示 -------------------- */
  private _resetFollowRecordContent(content: string): string {
    let matchArray = content.match(/#(.*?)#/g);
    if (matchArray) {
      matchArray.map(res => {
        content = content.replace(new RegExp(res, 'g'), `<a href="javascript:;">${res}</a>`);
      })
    }
    return content;
  }


  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7]
  }


}
