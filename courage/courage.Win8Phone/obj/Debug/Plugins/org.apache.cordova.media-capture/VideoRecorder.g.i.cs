﻿#pragma checksum "D:\Projects\oz\courage\courage.Win8Phone\Plugins\org.apache.cordova.media-capture\VideoRecorder.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "9DE52E27FF71C2B582DACC684CDCE0FD"
//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан программой.
//     Исполняемая версия:4.0.30319.34003
//
//     Изменения в этом файле могут привести к неправильной работе и будут потеряны в случае
//     повторной генерации кода.
// </auto-generated>
//------------------------------------------------------------------------------

using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using System;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Automation.Peers;
using System.Windows.Automation.Provider;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using System.Windows.Shapes;
using System.Windows.Threading;


namespace WPCordovaClassLib.Cordova.UI {
    
    
    public partial class VideoRecorder : Microsoft.Phone.Controls.PhoneApplicationPage {
        
        internal System.Windows.Controls.Canvas LayoutRoot;
        
        internal System.Windows.Shapes.Rectangle viewfinderRectangle;
        
        internal Microsoft.Phone.Shell.ApplicationBar PhoneAppBar;
        
        internal Microsoft.Phone.Shell.ApplicationBarIconButton btnStartRecording;
        
        internal Microsoft.Phone.Shell.ApplicationBarIconButton btnTakeVideo;
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Windows.Application.LoadComponent(this, new System.Uri("/courage.Win8Phone;component/Plugins/org.apache.cordova.media-capture/VideoRecord" +
                        "er.xaml", System.UriKind.Relative));
            this.LayoutRoot = ((System.Windows.Controls.Canvas)(this.FindName("LayoutRoot")));
            this.viewfinderRectangle = ((System.Windows.Shapes.Rectangle)(this.FindName("viewfinderRectangle")));
            this.PhoneAppBar = ((Microsoft.Phone.Shell.ApplicationBar)(this.FindName("PhoneAppBar")));
            this.btnStartRecording = ((Microsoft.Phone.Shell.ApplicationBarIconButton)(this.FindName("btnStartRecording")));
            this.btnTakeVideo = ((Microsoft.Phone.Shell.ApplicationBarIconButton)(this.FindName("btnTakeVideo")));
        }
    }
}

