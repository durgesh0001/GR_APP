const Menues =
    {
        menu:
            [
                {name: 'Dashboard', link: 'HomeComponent',icon:"ios-list-box-outline",key:1,submenu:[]},
                {name: 'Inbound GR', link: 'InboundGrMain',icon:"ios-cube-outline",key:4,submenu:[
                    {name:'New', link: 'NewGrComponent',icon:"ios-add-outline",key:1},
                    {name:'Draft', link: 'GrDraft',icon:"ios-paper-outline",key:1},
                    {name:'Pushed', link: 'NotificationSetting',icon:"ios-send-outline",key:1},

                ]},
                {name: 'Outbound Order', link: 'OutboundGrMain',icon:"ios-square-outline",key:4,submenu:[
                    {name:'New', link: 'NotificationSetting',icon:"ios-add-outline",key:1},
                    {name:'Draft', link: 'NotificationSetting',icon:"ios-paper-outline",key:1},
                    {name:'Pushed', link: 'NotificationSetting',icon:"ios-send-outline",key:1}
                ]},
                {name: 'Setting', link: 'NotificationSetting',icon:"ios-settings-outline"},
                {name: 'Logout', link: 'Logout',icon:"ios-power-outline",key:8,submenu:[]}
            ]
    }
export {Menues};
