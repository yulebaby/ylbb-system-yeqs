export const MenuConfig = [
  {
    title : '首页',
    brief : '首页',
    key   : '/home/index',
    icon  : 'home',
    disabled: true,
    isLeaf: true
  },
  {
    title : '预约管理',
    brief : '预约',
    key   : '/home/appointment',
    icon  : 'calendar',
    children : [
      {
        title : '预约列表',
        key   : '/home/appointment/list',
        isLeaf: true
      },
      {
        title : '泳师专用列表',
        key   : '/home/appointment/teacherlist',
        isLeaf: true
      },      
      {
        title : '水育师排班',
        key   : '/home/appointment/scheduling',
        isLeaf: true
      },
    ]
  },
  {
    title : '回访管理',
    brief : '回访',
    key   : '/home/visit',
    icon  : 'customer-service',
    children : [
      {
        title : '线索回访',
        key   : '/home/visit/clue',
        isLeaf: true
      },
      {
        title : '未办卡回访',
        key   : '/home/visit/nocard',
        isLeaf: true
      },
      {
        title : '会员回访',
        key   : '/home/visit/member',
        isLeaf: true
      }
    ]
  },
  {
    title : '客户管理',
    brief : '客户',
    key   : '/home/customer',
    icon  : 'team',
    children : [
      {
        title : '客户列表',
        key   : '/home/customer/list',
        isLeaf: true
      },
      {
        title : '无意向客户',
        key   : '/home/customer/nointention',
        isLeaf: true
      },
      {
        title : '上课结算',
        key   : '/home/customer/settlement',
        isLeaf: true
      },
      {
        title : '请假管理',
        key   : '/home/customer/leave',
        isLeaf: true
      }
    ]
  },
  {
    title : '会员卡管理',
    brief : '会员',
    key   : '/home/membercard',
    icon  : 'credit-card',
    children : [
      {
        title : '会员卡列表',
        key   : '/home/membercard/list',
        isLeaf: true
      },
      {
        title : '卡变更日志',
        key   : '/home/membercard/changelog',
        isLeaf: true
      },
      {
        title : '补卡日志',
        key   : '/home/membercard/patchlog',
        isLeaf: true
      },
      {
        title : '卡类型管理',
        key   : '/home/membercard/cardtype',
        isLeaf: true
      },
      {
        title : '卡业务管理',
        key   : '/home/membercard/cardbusiness',
        isLeaf: true
      },
      {
        title : '会员积分列表',
        key   : '/home/membercard/integrallist',
        isLeaf: true
      },
      {
        title : '积分变更',
        key   : '/home/membercard/integralchange',
        isLeaf: true
      },
      {
        title : '积分兑换',
        key   : '/home/membercard/integralexchange',
        isLeaf: true
      }
    ]
  },
  {
    title : '消费管理',
    brief : '消费',
    key   : '/home/consumption',
    icon  : 'red-envelope',
    children : [
      {
        title : '消费列表',
        key   : '/home/consumption/list',
        isLeaf: true
      },
      {
        title : '撤销记录',
        key   : '/home/consumption/revoke',
        isLeaf: true
      },
      {
        title : '满意度记录',
        key   : '/home/consumption/satisfaction',
        isLeaf: true
      },
    ]
  },
  {
    title : '充值中心',
    brief : '充值',
    key   : '/home/payment',
    icon  : 'message',
    children : [
      {
        title : '在线充值',
        key   : '/home/payment/pay',
        isLeaf: true
      },
      {
        title : '充值记录',
        key   : '/home/payment/record',
        isLeaf: true
      }
    ]
  },
  {
    title : '经营分析',
    brief : '经营',
    key   : '/home/analysis/list',
    icon  : 'area-chart',
    isLeaf: true
  },
  {
    title : '消息管理',
    brief : '消息',
    key   : '/home/message',
    icon  : 'message',
    children : [
      {
        title : '短信发送',
        key   : '/home/message/sendout',
        isLeaf: true
      },
      {
        title : '模板配置',
        key   : '/home/message/template',
        isLeaf: true
      },
      {
        title : '发送日志',
        key   : '/home/message/sendlog',
        isLeaf: true
      }
    ]
  },
  {
    title : '课程管理',
    brief : '课程',
    key   : '/home/coursemanagement',
    icon  : 'message',
    children : [
      {
        title : '课程类型设置',
        key   : '/home/coursemanagement/curriculumtype',
        isLeaf: true
      },
      {
        title : '课程类别设置',
        key   : '/home/coursemanagement/currcategorytype',
        isLeaf: true
      },
      {
        title : '教师学员课表',
        key   : '/home/coursemanagement/teacher',
        isLeaf: true
      },
      {
        title : '智能排课',
        key   : '/home/coursemanagement/intelligent',
        isLeaf: true
      },
      {
        title : '课程管理',
        key   : '/home/coursemanagement/list',
        isLeaf: true
      },
      {
        title : '课表展示',
        key   : '/home/coursemanagement/timetable',
        isLeaf: true
      },
      {
        title : '课表调整',
        key   : '/home/coursemanagement/adjustment',
        isLeaf: true
      }
    ]
  },
  {
    title : '人力资源',
    brief : '人力',
    key   : '/home/humanresources',
    icon  : 'idcard',
    children: [
      {
        title : '职位管理',
        key   : '/home/humanresources/positionsalary',
        isLeaf: true
      },

      {
        title : '部门管理',
        key   : '/home/humanresources/department',
        isLeaf: true
      },
      {
        title : '员工管理',
        key   : '/home/humanresources/staff',
        isLeaf: true
      },
      {
        title : '销售提成',
        key   : '/home/humanresources/bonussales',
        isLeaf: true
      },
      {
        title : '考勤情况',
        key   : '/home/humanresources/achievements/checkwork',
        isLeaf: true
      },
      {
        title : '扣分管理',
        key   : '/home/humanresources/achievements/deduction',
        isLeaf: true
      },
      {
        title : '提成明细',
        key   : '/home/humanresources/achievements/extract',
        isLeaf: true
      },
      {
        title : '提成统计',
        key   : '/home/humanresources/achievements/statistics',
        isLeaf: true
      },
      {
        title : '满意度管理',
        key   : '/home/humanresources/achievements/satisfaction',
        isLeaf: true
      },
      {
        title : '考核项目配置',
        key   : '/home/humanresources/wage/assessment',
        isLeaf: true
      },
      {
        title : '单月手动调整',
        key   : '/home/humanresources/wage/adjustment',
        isLeaf: true
      },
      {
        title : '单月工资查询',
        key   : '/home/humanresources/wage/inquire',
        isLeaf: true
      }
    ]
  },
  {
    title : '设置',
    brief : '设置',
    key   : '/home/configuration',
    icon  : 'setting',
    children: [
      {
        title : '基础设置',
        key   : '/home/configuration/base',
        isLeaf: true
      },
      {
        title : '社区管理',
        key   : '/home/configuration/community',
        isLeaf: true
      },
      {
        title : '客户来源',
        key   : '/home/configuration/csource',
        isLeaf: true
      },
      {
        title : '门店信息',
        key   : '/home/configuration/store',
        isLeaf: true
      },
      {
        title : '用户建议',
        key   : '/home/configuration/tips',
        isLeaf: true
      },
      {
        title : '商品列表',
        key   : '/home/configuration/commodity/list',
        isLeaf: true
      },
      {
        title : '库存管理',
        key   : '/home/configuration/commodity/stock',
        isLeaf: true
      },
      {
        title : '账号管理',
        key   : '/home/configuration/account/number',
        isLeaf: true
      },
      {
        title : '角色管理',
        key   : '/home/configuration/account/role',
        isLeaf: true
      },
      {
        title : '登录日志',
        key   : '/home/configuration/account/loginlog',
        isLeaf: true
      },
      {
        title : '排课时段',
        key   : '/home/configuration/timetableperiod',
        isLeaf: true
      },
      {
        title : '上课教室',
        key   : '/home/configuration/classroom',
        isLeaf: true
      }
    ]
  },  {
    title : '审核',
    brief : '审核',
    key   : '/home/examine',
    icon  : 'setting',
    children: [
      {
        title : '事件审核',
        key   : '/home/examine/list',
        isLeaf: true
      },
    
    ]
  },
  
];