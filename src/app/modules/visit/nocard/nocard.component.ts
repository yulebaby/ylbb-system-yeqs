import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PreviewComponent } from '../preview/preview.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-nocard',
  templateUrl: './nocard.component.html',
  styleUrls: ['./nocard.component.scss']
})
export class NocardComponent implements OnInit {

  @ViewChild('EaTable') table;
  yhfTable: any = [];
  isLoadingHf: boolean = false;
  queryNode = [
    {
      label       : '宝宝昵称',
      key         : 'nick',
      type        : 'input',
    },
    {
      label       : '来源',
      key         : 'customerSourceId',
      optionKey: { label: 'sourceName', value: 'sourceId' },
      type        : 'select',
      optionsUrl  : '/management/selectSource',
      isHide      : true
    },
    {
      label       : '家长姓名',
      key         : 'parentName',
      type        : 'input',
    }, 
    {
      label       : '手机号码',
      key         : 'mobilePhone',
      type        : 'input',
    },
    {
      label       : '下次跟进',
      key         : 'nextFollowTime',
      type        : 'rangepicker',
      valueKey    : ['nextFollowTimeStart', 'nextFollowTimeEnd']
    },
    {
      label       : '宝宝性别',
      key         : 'sex',
      type        : 'select',
      options     : [ { name: '男', id: '男' }, { name: '女', id: '女' } ],
      isHide      : true
    },
    {
      label       : '宝宝生日',
      key         : 'birthday',
      type        : 'rangepicker',
      valueKey    : ['babyBirthdayStart', 'babyBirthdayEnd'],
      isHide      : true
    },
    {
      label       : '创建时间',
      key         : 'createTime',
      type        : 'rangepicker',
      valueKey    : ['createDateStart', 'createDateEnd'],
      isHide      : true
    },
    {
      label       : '最后跟进',
      key         : 'lastFollowTime',
      type        : 'rangepicker',
      valueKey    : ['lastFollowTimeStart', 'lastFollowTimeEnd'],
      isHide      : true
    },
    {
      label       : '收集者',
      key         : 'collectorId',
      type        : 'select',
      optionsUrl  : '/retrunVisit/getEmployeeList',
      isHide      : true
    },
    {
      label       : '推荐人',
      key         : 'recommendedId',
      type        : 'select',
      optionsUrl  : '/common/recommenderList',
      isHide      : true
    },
  ];
  tableNode = [
    {
      name  : '宝宝昵称',
      width : '120px',
      left  : 0
    },
    {
      name  : '宝宝姓名',
      width : '100px'
    },
    {
      name  : '宝宝生日',
      width : '100px'
    },
    {
      name  : '性别',
      width : '60px'
    },
    {
      name  : '月龄',
      width : '60px'
    },
    {
      name  : '家长姓名',
      width : '100px'
    },
    {
      name  : '家长电话',
      width : '100px'
    },
    {
      name  : '所属小区',
      width : '140px'
    }, 
    {
      name  : '体验时间',
      width : '140px'
    },
    {
      name  : '下次跟进时间',
      width : '140px'
    },
    {
      name  : '最后跟进时间',
      width : '140px'
    },
    {
      name  : '来源',
      width : '80px'
    },
    {
      name  : '客户状态',
      width : '80px'
    },
    {
      name  : '跟进阶段',
      width : '120px'
    },
    {
      name  : '收集者',
      width : '120px'
    }
  ]

  constructor(
    private drawer: NzDrawerService,
    private format: DatePipe,
    private http: HttpService
  ) { }
  ngOnInit() {
  }

  preview(id) {
    const drawer = this.drawer.create({
      nzWidth: 860,
      nzContent: PreviewComponent,
      nzClosable: false,
      nzContentParams: { id, followStageId: 3 }
    });
    drawer.afterClose.subscribe(res => this.table._request());
  }

  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<any>;
  gethf(){
    this.isLoadingHf = true;
    this.http.post('/retrunVisit/todayReturnVisit', { status: 1 },false).then(res => {
      this.isLoadingHf = false;
      this.yhfTable = res.result;
      this.drawer.create({
        nzTitle: '已回访列表'+ '('+ this.yhfTable.length +'条)',
        nzWidth: 900,
        nzContent: this.drawerTemplate
      });
    })
  }  
}
