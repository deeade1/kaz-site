const Dashboard = memo(() => {
    return (
      <Fragment>
<div class="content-inner pb-0 container-fluid" id="page_layout">
<div class="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3">
    <div class="d-flex flex-column">
        <h3>Quick Insights</h3>
        <p class="text-primary mb-0">Financial Dashboard</p>
    </div>
    <div class="d-flex justify-content-between align-items-center rounded flex-wrap gap-3">
        <div class="form-check form-switch mb-0 iq-status-switch">
            <input class="form-check-input iq-status" type="checkbox" id="iq-switch" checked="" />
            <label class="form-check-label iq-reset-status" for="iq-switch">
                Online
            </label>
        </div>
        <div class="form-group mb-0">
            <select class="select2-basic-single js-states form-control select2-hidden-accessible" name="state" style="width: 100%;" data-select2-id="select2-data-1-u273" tabindex="-1" aria-hidden="true">
                <option data-select2-id="select2-data-3-4htw">Past 30 Days</option>
                <option>Past 60 Days</option>
                <option>Past 90 Days</option>
                <option>Past 1 year</option>
                <option>Past 2 year</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-2-r99y" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-state-u1-container" aria-controls="select2-state-u1-container"><span class="select2-selection__rendered" id="select2-state-u1-container" role="textbox" aria-readonly="true" title="Past 30 Days">Past 30 Days</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
        </div>
        <div class="form-group mb-0">
            <input type="text" name="start" class="form-control range_flatpicker flatpickr-input active" placeholder="24 Jan 2022 to 23 Feb 2022" readonly="readonly" />
        </div>
        <button type="button" class="btn btn-primary">Analytics</button>
    </div>
</div>
<div class="row">
    <div class="col-lg-3 col-md-6">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="d-flex align-items-start justify-content-between mb-2">
                    <p class="mb-0 text-dark">Gross Volume</p>
                    <a class="badge rounded-pill bg-primary-subtle" href="javascript:void(0);">
                        View
                    </a>
                </div>
                <div class="mb-3">
                    <h2 class="counter" style="visibility: visible;">$199,556</h2>
                    <small>Last updated 1 hour ago.</small>
                </div>
                <div>
                    <div id="grossVolume" style="min-height: 145px;"><div id="apexchartsguxh937" class="apexcharts-canvas apexchartsguxh937 apexcharts-theme-light" style="width: 395px; height: 130px;"><svg id="SvgjsSvg1239" width="395" height="130" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><foreignObject x="0" y="0" width="395" height="130"><div class="apexcharts-legend" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 65px;"></div></foreignObject><g id="SvgjsG1329" class="apexcharts-yaxis" rel="0" transform="translate(2, 0)"><g id="SvgjsG1330" class="apexcharts-yaxis-texts-g"><text id="SvgjsText1332" font-family="Helvetica, Arial, sans-serif" x="20" y="31.1" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1333">160</tspan><title>160</title></text><text id="SvgjsText1335" font-family="Helvetica, Arial, sans-serif" x="20" y="106.1" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1336">0</tspan><title>0</title></text></g><g id="SvgjsG1337" class="apexcharts-yaxis-title"><text id="SvgjsText1338" font-family="Helvetica, Arial, sans-serif" x="-13.3565673828125" y="67.5" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="900" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-title-text " style="font-family: Helvetica, Arial, sans-serif;" transform="rotate(-90 0 0)"></text></g></g><g id="SvgjsG1241" class="apexcharts-inner apexcharts-graphical" transform="translate(32, 30)"><defs id="SvgjsDefs1240"><linearGradient id="SvgjsLinearGradient1245" x1="0" y1="0" x2="0" y2="1"><stop id="SvgjsStop1246" stop-opacity="0.4" stop-color="rgba(216,227,240,0.4)" offset="0"></stop><stop id="SvgjsStop1247" stop-opacity="0.5" stop-color="rgba(190,209,230,0.5)" offset="1"></stop><stop id="SvgjsStop1248" stop-opacity="0.5" stop-color="rgba(190,209,230,0.5)" offset="1"></stop></linearGradient><clipPath id="gridRectMaskguxh937"><rect id="SvgjsRect1250" width="360" height="82" x="-3.5" y="-3.5" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMaskguxh937"></clipPath><clipPath id="nonForecastMaskguxh937"></clipPath><clipPath id="gridRectMarkerMaskguxh937"><rect id="SvgjsRect1251" width="357" height="79" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><rect id="SvgjsRect1249" width="14.12" height="75" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke-dasharray="3" fill="url(#SvgjsLinearGradient1245)" class="apexcharts-xcrosshairs" y2="75" filter="none" fill-opacity="0.9"></rect><line id="SvgjsLine1291" x1="0" y1="76" x2="0" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1292" x1="50.42857142857143" y1="76" x2="50.42857142857143" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1293" x1="100.85714285714286" y1="76" x2="100.85714285714286" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1294" x1="151.28571428571428" y1="76" x2="151.28571428571428" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1295" x1="201.71428571428572" y1="76" x2="201.71428571428572" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1296" x1="252.14285714285717" y1="76" x2="252.14285714285717" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1297" x1="302.5714285714286" y1="76" x2="302.5714285714286" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1298" x1="353.00000000000006" y1="76" x2="353.00000000000006" y2="82" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><g id="SvgjsG1287" class="apexcharts-grid"><g id="SvgjsG1288" class="apexcharts-gridlines-horizontal"></g><g id="SvgjsG1289" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine1302" x1="0" y1="75" x2="353" y2="75" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine1301" x1="0" y1="1" x2="0" y2="75" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g><g id="SvgjsG1290" class="apexcharts-grid-borders"><line id="SvgjsLine1299" x1="0" y1="0" x2="353" y2="0" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1300" x1="0" y1="75" x2="353" y2="75" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1328" x1="0" y1="76" x2="353" y2="76" stroke="#e0e0e0" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"></line></g><g id="SvgjsG1252" class="apexcharts-bar-series apexcharts-plot-series"><g id="SvgjsG1253" class="apexcharts-series" seriesName="Successfulxdeals" rel="1" data:realIndex="0"><path id="SvgjsPath1257" d="M 18.154285714285717 75.001 L 18.154285714285717 60.9385 L 29.274285714285718 60.9385 L 29.274285714285718 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 18.154285714285717 75.001 L 18.154285714285717 60.9385 L 29.274285714285718 60.9385 L 29.274285714285718 75.001 z" pathFrom="M 18.154285714285717 75.001 L 18.154285714285717 75.001 L 29.274285714285718 75.001 L 29.274285714285718 75.001 L 29.274285714285718 75.001 L 29.274285714285718 75.001 L 29.274285714285718 75.001 L 18.154285714285717 75.001 z" cy="60.9375" cx="67.08285714285715" j="0" val="30" barHeight="14.0625" barWidth="14.12"></path><path id="SvgjsPath1259" d="M 68.58285714285715 75.001 L 68.58285714285715 51.5635 L 79.70285714285716 51.5635 L 79.70285714285716 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 68.58285714285715 75.001 L 68.58285714285715 51.5635 L 79.70285714285716 51.5635 L 79.70285714285716 75.001 z" pathFrom="M 68.58285714285715 75.001 L 68.58285714285715 75.001 L 79.70285714285716 75.001 L 79.70285714285716 75.001 L 79.70285714285716 75.001 L 79.70285714285716 75.001 L 79.70285714285716 75.001 L 68.58285714285715 75.001 z" cy="51.5625" cx="117.51142857142858" j="1" val="50" barHeight="23.4375" barWidth="14.12"></path><path id="SvgjsPath1261" d="M 119.01142857142858 75.001 L 119.01142857142858 58.59475 L 130.1314285714286 58.59475 L 130.1314285714286 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 119.01142857142858 75.001 L 119.01142857142858 58.59475 L 130.1314285714286 58.59475 L 130.1314285714286 75.001 z" pathFrom="M 119.01142857142858 75.001 L 119.01142857142858 75.001 L 130.1314285714286 75.001 L 130.1314285714286 75.001 L 130.1314285714286 75.001 L 130.1314285714286 75.001 L 130.1314285714286 75.001 L 119.01142857142858 75.001 z" cy="58.59375" cx="167.94" j="2" val="35" barHeight="16.40625" barWidth="14.12"></path><path id="SvgjsPath1263" d="M 169.44 75.001 L 169.44 46.876 L 180.56 46.876 L 180.56 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 169.44 75.001 L 169.44 46.876 L 180.56 46.876 L 180.56 75.001 z" pathFrom="M 169.44 75.001 L 169.44 75.001 L 180.56 75.001 L 180.56 75.001 L 180.56 75.001 L 180.56 75.001 L 180.56 75.001 L 169.44 75.001 z" cy="46.875" cx="218.36857142857144" j="3" val="60" barHeight="28.125" barWidth="14.12"></path><path id="SvgjsPath1265" d="M 219.86857142857144 75.001 L 219.86857142857144 56.251 L 230.98857142857145 56.251 L 230.98857142857145 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 219.86857142857144 75.001 L 219.86857142857144 56.251 L 230.98857142857145 56.251 L 230.98857142857145 75.001 z" pathFrom="M 219.86857142857144 75.001 L 219.86857142857144 75.001 L 230.98857142857145 75.001 L 230.98857142857145 75.001 L 230.98857142857145 75.001 L 230.98857142857145 75.001 L 230.98857142857145 75.001 L 219.86857142857144 75.001 z" cy="56.25" cx="268.7971428571429" j="4" val="40" barHeight="18.75" barWidth="14.12"></path><path id="SvgjsPath1267" d="M 270.2971428571429 75.001 L 270.2971428571429 46.876 L 281.4171428571429 46.876 L 281.4171428571429 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 270.2971428571429 75.001 L 270.2971428571429 46.876 L 281.4171428571429 46.876 L 281.4171428571429 75.001 z" pathFrom="M 270.2971428571429 75.001 L 270.2971428571429 75.001 L 281.4171428571429 75.001 L 281.4171428571429 75.001 L 281.4171428571429 75.001 L 281.4171428571429 75.001 L 281.4171428571429 75.001 L 270.2971428571429 75.001 z" cy="46.875" cx="319.22571428571433" j="5" val="60" barHeight="28.125" barWidth="14.12"></path><path id="SvgjsPath1269" d="M 320.72571428571433 75.001 L 320.72571428571433 46.876 L 331.84571428571434 46.876 L 331.84571428571434 75.001 z" fill="rgba(58,87,232,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskguxh937)" pathTo="M 320.72571428571433 75.001 L 320.72571428571433 46.876 L 331.84571428571434 46.876 L 331.84571428571434 75.001 z" pathFrom="M 320.72571428571433 75.001 L 320.72571428571433 75.001 L 331.84571428571434 75.001 L 331.84571428571434 75.001 L 331.84571428571434 75.001 L 331.84571428571434 75.001 L 331.84571428571434 75.001 L 320.72571428571433 75.001 z" cy="46.875" cx="369.6542857142858" j="6" val="60" barHeight="28.125" barWidth="14.12"></path><g id="SvgjsG1255" class="apexcharts-bar-goals-markers"><g id="SvgjsG1256" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1258" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1260" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1262" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1264" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1266" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1268" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g></g></g><g id="SvgjsG1270" class="apexcharts-series" seriesName="Failedxdeals" rel="2" data:realIndex="1"><path id="SvgjsPath1274" d="M 18.154285714285717 60.939499999999995 L 18.154285714285717 45.189499999999995 C 18.154285714285717 43.689499999999995 19.654285714285717 42.189499999999995 21.154285714285717 42.189499999999995 L 26.274285714285718 42.189499999999995 C 27.774285714285718 42.189499999999995 29.274285714285718 43.689499999999995 29.274285714285718 45.189499999999995 L 29.274285714285718 60.939499999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 18.154285714285717 60.939499999999995 L 18.154285714285717 45.189499999999995 C 18.154285714285717 43.689499999999995 19.654285714285717 42.189499999999995 21.154285714285717 42.189499999999995 L 26.274285714285718 42.189499999999995 C 27.774285714285718 42.189499999999995 29.274285714285718 43.689499999999995 29.274285714285718 45.189499999999995 L 29.274285714285718 60.939499999999995 z " pathFrom="M 18.154285714285717 60.939499999999995 L 18.154285714285717 60.939499999999995 L 29.274285714285718 60.939499999999995 L 29.274285714285718 60.939499999999995 L 29.274285714285718 60.939499999999995 L 29.274285714285718 60.939499999999995 L 29.274285714285718 60.939499999999995 L 18.154285714285717 60.939499999999995 z" cy="42.1885" cx="67.08285714285715" j="0" val="40" barHeight="18.75" barWidth="14.12"></path><path id="SvgjsPath1276" d="M 68.58285714285715 51.564499999999995 L 68.58285714285715 31.127 C 68.58285714285715 29.627 70.08285714285715 28.127 71.58285714285715 28.127 L 76.70285714285716 28.127 C 78.20285714285716 28.127 79.70285714285716 29.627 79.70285714285716 31.127 L 79.70285714285716 51.564499999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 68.58285714285715 51.564499999999995 L 68.58285714285715 31.127 C 68.58285714285715 29.627 70.08285714285715 28.127 71.58285714285715 28.127 L 76.70285714285716 28.127 C 78.20285714285716 28.127 79.70285714285716 29.627 79.70285714285716 31.127 L 79.70285714285716 51.564499999999995 z " pathFrom="M 68.58285714285715 51.564499999999995 L 68.58285714285715 51.564499999999995 L 79.70285714285716 51.564499999999995 L 79.70285714285716 51.564499999999995 L 79.70285714285716 51.564499999999995 L 79.70285714285716 51.564499999999995 L 79.70285714285716 51.564499999999995 L 68.58285714285715 51.564499999999995 z" cy="28.125999999999998" cx="117.51142857142858" j="1" val="50" barHeight="23.4375" barWidth="14.12"></path><path id="SvgjsPath1278" d="M 119.01142857142858 58.595749999999995 L 119.01142857142858 35.814499999999995 C 119.01142857142858 34.314499999999995 120.51142857142858 32.814499999999995 122.01142857142858 32.814499999999995 L 127.13142857142859 32.814499999999995 C 128.6314285714286 32.814499999999995 130.1314285714286 34.314499999999995 130.1314285714286 35.814499999999995 L 130.1314285714286 58.595749999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 119.01142857142858 58.595749999999995 L 119.01142857142858 35.814499999999995 C 119.01142857142858 34.314499999999995 120.51142857142858 32.814499999999995 122.01142857142858 32.814499999999995 L 127.13142857142859 32.814499999999995 C 128.6314285714286 32.814499999999995 130.1314285714286 34.314499999999995 130.1314285714286 35.814499999999995 L 130.1314285714286 58.595749999999995 z " pathFrom="M 119.01142857142858 58.595749999999995 L 119.01142857142858 58.595749999999995 L 130.1314285714286 58.595749999999995 L 130.1314285714286 58.595749999999995 L 130.1314285714286 58.595749999999995 L 130.1314285714286 58.595749999999995 L 130.1314285714286 58.595749999999995 L 119.01142857142858 58.595749999999995 z" cy="32.8135" cx="167.94" j="2" val="55" barHeight="25.78125" barWidth="14.12"></path><path id="SvgjsPath1280" d="M 169.44 46.876999999999995 L 169.44 26.4395 C 169.44 24.9395 170.94 23.4395 172.44 23.4395 L 177.56 23.4395 C 179.06 23.4395 180.56 24.9395 180.56 26.4395 L 180.56 46.876999999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 169.44 46.876999999999995 L 169.44 26.4395 C 169.44 24.9395 170.94 23.4395 172.44 23.4395 L 177.56 23.4395 C 179.06 23.4395 180.56 24.9395 180.56 26.4395 L 180.56 46.876999999999995 z " pathFrom="M 169.44 46.876999999999995 L 169.44 46.876999999999995 L 180.56 46.876999999999995 L 180.56 46.876999999999995 L 180.56 46.876999999999995 L 180.56 46.876999999999995 L 180.56 46.876999999999995 L 169.44 46.876999999999995 z" cy="23.438499999999998" cx="218.36857142857144" j="3" val="50" barHeight="23.4375" barWidth="14.12"></path><path id="SvgjsPath1282" d="M 219.86857142857144 56.251999999999995 L 219.86857142857144 45.189499999999995 C 219.86857142857144 43.689499999999995 221.36857142857144 42.189499999999995 222.86857142857144 42.189499999999995 L 227.98857142857145 42.189499999999995 C 229.48857142857145 42.189499999999995 230.98857142857145 43.689499999999995 230.98857142857145 45.189499999999995 L 230.98857142857145 56.251999999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 219.86857142857144 56.251999999999995 L 219.86857142857144 45.189499999999995 C 219.86857142857144 43.689499999999995 221.36857142857144 42.189499999999995 222.86857142857144 42.189499999999995 L 227.98857142857145 42.189499999999995 C 229.48857142857145 42.189499999999995 230.98857142857145 43.689499999999995 230.98857142857145 45.189499999999995 L 230.98857142857145 56.251999999999995 z " pathFrom="M 219.86857142857144 56.251999999999995 L 219.86857142857144 56.251999999999995 L 230.98857142857145 56.251999999999995 L 230.98857142857145 56.251999999999995 L 230.98857142857145 56.251999999999995 L 230.98857142857145 56.251999999999995 L 230.98857142857145 56.251999999999995 L 219.86857142857144 56.251999999999995 z" cy="42.1885" cx="268.7971428571429" j="4" val="30" barHeight="14.0625" barWidth="14.12"></path><path id="SvgjsPath1284" d="M 270.2971428571429 46.876999999999995 L 270.2971428571429 12.376999999999997 C 270.2971428571429 10.876999999999997 271.7971428571429 9.376999999999997 273.2971428571429 9.376999999999997 L 278.4171428571429 9.376999999999997 C 279.9171428571429 9.376999999999997 281.4171428571429 10.876999999999997 281.4171428571429 12.376999999999997 L 281.4171428571429 46.876999999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 270.2971428571429 46.876999999999995 L 270.2971428571429 12.376999999999997 C 270.2971428571429 10.876999999999997 271.7971428571429 9.376999999999997 273.2971428571429 9.376999999999997 L 278.4171428571429 9.376999999999997 C 279.9171428571429 9.376999999999997 281.4171428571429 10.876999999999997 281.4171428571429 12.376999999999997 L 281.4171428571429 46.876999999999995 z " pathFrom="M 270.2971428571429 46.876999999999995 L 270.2971428571429 46.876999999999995 L 281.4171428571429 46.876999999999995 L 281.4171428571429 46.876999999999995 L 281.4171428571429 46.876999999999995 L 281.4171428571429 46.876999999999995 L 281.4171428571429 46.876999999999995 L 270.2971428571429 46.876999999999995 z" cy="9.375999999999998" cx="319.22571428571433" j="5" val="80" barHeight="37.5" barWidth="14.12"></path><path id="SvgjsPath1286" d="M 320.72571428571433 46.876999999999995 L 320.72571428571433 35.814499999999995 C 320.72571428571433 34.314499999999995 322.22571428571433 32.814499999999995 323.72571428571433 32.814499999999995 L 328.84571428571434 32.814499999999995 C 330.34571428571434 32.814499999999995 331.84571428571434 34.314499999999995 331.84571428571434 35.814499999999995 L 331.84571428571434 46.876999999999995 z " fill="rgba(8,177,186,1)" fill-opacity="1" stroke="transparent" stroke-opacity="1" stroke-linecap="round" stroke-width="3" stroke-dasharray="0" class="apexcharts-bar-area" index="1" clip-path="url(#gridRectMaskguxh937)" pathTo="M 320.72571428571433 46.876999999999995 L 320.72571428571433 35.814499999999995 C 320.72571428571433 34.314499999999995 322.22571428571433 32.814499999999995 323.72571428571433 32.814499999999995 L 328.84571428571434 32.814499999999995 C 330.34571428571434 32.814499999999995 331.84571428571434 34.314499999999995 331.84571428571434 35.814499999999995 L 331.84571428571434 46.876999999999995 z " pathFrom="M 320.72571428571433 46.876999999999995 L 320.72571428571433 46.876999999999995 L 331.84571428571434 46.876999999999995 L 331.84571428571434 46.876999999999995 L 331.84571428571434 46.876999999999995 L 331.84571428571434 46.876999999999995 L 331.84571428571434 46.876999999999995 L 320.72571428571433 46.876999999999995 z" cy="32.8135" cx="369.6542857142858" j="6" val="30" barHeight="14.0625" barWidth="14.12"></path><g id="SvgjsG1272" class="apexcharts-bar-goals-markers"><g id="SvgjsG1273" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1275" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1277" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1279" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1281" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1283" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g><g id="SvgjsG1285" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskguxh937)"></g></g></g><g id="SvgjsG1254" class="apexcharts-datalabels" data:realIndex="0"></g><g id="SvgjsG1271" class="apexcharts-datalabels" data:realIndex="1"></g></g><line id="SvgjsLine1303" x1="0" y1="0" x2="353" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1304" x1="0" y1="0" x2="353" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1305" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1306" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"><text id="SvgjsText1308" font-family="Helvetica, Arial, sans-serif" x="25.214285714285715" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1309">S</tspan><title>S</title></text><text id="SvgjsText1311" font-family="Helvetica, Arial, sans-serif" x="75.64285714285714" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1312">M</tspan><title>M</title></text><text id="SvgjsText1314" font-family="Helvetica, Arial, sans-serif" x="126.07142857142856" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1315">T</tspan><title>T</title></text><text id="SvgjsText1317" font-family="Helvetica, Arial, sans-serif" x="176.5" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1318">W</tspan><title>W</title></text><text id="SvgjsText1320" font-family="Helvetica, Arial, sans-serif" x="226.92857142857144" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1321">T</tspan><title>T</title></text><text id="SvgjsText1323" font-family="Helvetica, Arial, sans-serif" x="277.3571428571429" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1324">F</tspan><title>F</title></text><text id="SvgjsText1326" font-family="Helvetica, Arial, sans-serif" x="327.78571428571433" y="104" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#8a92a6" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1327">S</tspan><title>S</title></text></g></g><g id="SvgjsG1339" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1340" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1341" class="apexcharts-point-annotations"></g></g></svg><div class="apexcharts-tooltip apexcharts-theme-light"><div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div><div class="apexcharts-tooltip-series-group" style="order: 1;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(58, 87, 232);"></span><div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div><div class="apexcharts-tooltip-series-group" style="order: 2;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(8, 177, 186);"></span><div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div class="apexcharts-yaxistooltip-text"></div></div></div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="row">
            <div class="col-12">
                <div class="card card-block card-stretch card-height">
                    <div class="card-body">
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <span class="text-dark ">USD Balance</span>
                            <a class="badge rounded-pill bg-primary-subtle" href="javascript:void(0);">
                                Request Payout
                            </a>
                        </div>
                        <h2 class="counter" style="visibility: visible;">$2590</h2>
                        <small>Available to pay out.</small>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card card-block card-stretch card-height">
                    <div class="card-body">
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <span class="text-dark">No Of Payments</span>
                            <a class="badge rounded-pill bg-primary-subtle" href="javascript:void(0);">
                                View
                            </a>
                        </div>
                        <h2 class="counter" style="visibility: visible;">367</h2>
                        <small>Transactions this month</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mb-5 mb-md-0">
                        <div class="mb-5">
                            <div class="mb-2 d-flex justify-content-between align-items-center">
                                <span class="text-dark">Last Transaction</span>
                                <a class="badge rounded-pill bg-primary-subtle" href="javascript:void(0);">
                                    View Report
                                </a>
                            </div>
                            <div class="mb-2">
                                <h2 class="counter" style="visibility: visible;">$58,556</h2>
                                <small>This Month</small>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <div class="bg-primary-subtle avatar-60 rounded">
                                    <svg class="icon-35" width="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor"></path>
                                        <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div style="width: 100%;">
                                    <div class="d-flex justify-content-between  ">
                                        <h6>Received</h6>
                                        <h6 class="text-body">$5,674</h6>
                                    </div>
                                    <div class="progress bg-primary-subtle shadow-none w-100" style="height: 6px">
                                        <div class="progress-bar bg-primary" data-toggle="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 70%; transition: width 2s ease 0s;"></div>
                                    </div>
                                </div> 
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-primary-subtle avatar-60 rounded">     
                                    <svg class="icon-35" width="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z" fill="currentColor"></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </div>
                                <div style="width: 100%;">
                                    <div class="d-flex justify-content-between  ">
                                        <h6>Transferred</h6>
                                        <h6 class="text-body">$1,624</h6>
                                    </div>
                                    <div class="progress bg-info-subtle shadow-none w-100" style="height: 6px">
                                        <div class="progress-bar bg-info" data-toggle="progress-bar" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="width: 33%; transition: width 2s ease 0s;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="iq-scroller-effect">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-dark">Send Money To</span>
                                <a href="../dashboard/table/border-table.html" class="badge rounded-pill bg-primary-subtle">
                                    All Contacts
                                </a>
                            </div>
                            <div class="d-flex align-items-center iq-slider mb-5 gap-2">
                                <div>
                                    <img class="rounded-circle bg-primary-subtle img-fluid avatar-40 mb-2" src="../assets/images/table/1.png" alt="profile" loading="lazy" />
                                </div>
                                <div>
                                    <img class="rounded-circle bg-primary-subtle img-fluid avatar-40 mb-2" src="../assets/images/table/2.png" alt="profile" loading="lazy" />
                                </div>
                                <div>
                                    <img class="rounded-circle bg-primary-subtle img-fluid avatar-40 mb-2" src="../assets/images/table/3.png" alt="profile" loading="lazy" />
                                </div>
                                <div>
                                    <img class="rounded-circle bg-primary-subtle img-fluid avatar-40 mb-2" src="../assets/images/table/4.png" alt="profile" loading="lazy" />
                                </div>
                                <div>
                                    <img class="rounded-circle bg-primary-subtle img-fluid avatar-40 mb-2" src="../assets/images/table/5.png" alt="profile" loading="lazy" />
                                </div>
                            </div>
                            <div>
                                <div class="form-group">
                                    <select class="select2-basic-single js-states form-control form-group select2-hidden-accessible" name="Account" style="width: 100%;" data-select2-id="select2-data-4-mlk8" tabindex="-1" aria-hidden="true">
                                        <option selected="" data-select2-id="select2-data-6-0ykg">Select Your Account</option>
                                        <option value="1">5521000120354</option>
                                        <option value="2">5521000125145</option>
                                        <option value="3">5521000129665</option>
                                    </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-5-lwxx" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-Account-jo-container" aria-controls="select2-Account-jo-container"><span class="select2-selection__rendered" id="select2-Account-jo-container" role="textbox" aria-readonly="true" title="Select Your Account">Select Your Account</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                                <div class="form-group">
                                    <select class="select2-basic-single-tag js-states form-control select2-hidden-accessible" name="Amount" style="width: 100%;" data-select2-id="select2-data-7-5nv4" tabindex="-1" aria-hidden="true">
                                        <option selected="" data-select2-id="select2-data-9-xhaa">Enter Amount in USD</option>
                                        <option value="1">100</option>
                                        <option value="2">200</option>
                                        <option value="5">500</option>
                                    </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-8-oxbp" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-Amount-hp-container" aria-controls="select2-Amount-hp-container"><span class="select2-selection__rendered" id="select2-Amount-hp-container" role="textbox" aria-readonly="true" title="Enter Amount in USD">Enter Amount in USD</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                            </div>
                            <button class="btn btn-primary w-100 mt-2">Send Money</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-header">
                    <div class=" d-flex justify-content-between  flex-wrap">
                    <h4 class="card-title">Net Volumes From Sales</h4>
                    <div class="dropdown">
                     <a href="#" class="text-gray dropdown-toggle" id="dropdownMenuButton22" data-bs-toggle="dropdown" aria-expanded="false">
                     This year
                     </a>
                     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton22">
                        <li><a class="dropdown-item" href="#">Year</a></li>
                        <li><a class="dropdown-item" href="#">Month</a></li>
                        <li><a class="dropdown-item" href="#">Week</a></li>
                     </ul>
                  </div>
                </div>
            </div>
            <div class="card-body">
                <div id="dashboard-line-chart"><div id="apexchartszurl7neg" class="apexcharts-canvas apexchartszurl7neg apexcharts-theme-light" style="width: 395px; height: 300px;"><svg id="SvgjsSvg1342" width="395" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" class="apexcharts-svg apexcharts-zoomable" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><foreignObject x="0" y="0" width="395" height="300"><div class="apexcharts-legend" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 150px;"></div></foreignObject><rect id="SvgjsRect1347" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect><g id="SvgjsG1424" class="apexcharts-yaxis" rel="0" transform="translate(14.547212600708008, 0)"><g id="SvgjsG1425" class="apexcharts-yaxis-texts-g"><text id="SvgjsText1427" font-family="Helvetica, Arial, sans-serif" x="20" y="32" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1428">110</tspan><title>110</title></text><text id="SvgjsText1430" font-family="Helvetica, Arial, sans-serif" x="20" y="55.28834520606995" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1431">100</tspan><title>100</title></text><text id="SvgjsText1433" font-family="Helvetica, Arial, sans-serif" x="20" y="78.5766904121399" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1434">90</tspan><title>90</title></text><text id="SvgjsText1436" font-family="Helvetica, Arial, sans-serif" x="20" y="101.86503561820984" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1437">80</tspan><title>80</title></text><text id="SvgjsText1439" font-family="Helvetica, Arial, sans-serif" x="20" y="125.1533808242798" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1440">70</tspan><title>70</title></text><text id="SvgjsText1442" font-family="Helvetica, Arial, sans-serif" x="20" y="148.44172603034974" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1443">60</tspan><title>60</title></text><text id="SvgjsText1445" font-family="Helvetica, Arial, sans-serif" x="20" y="171.7300712364197" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1446">50</tspan><title>50</title></text><text id="SvgjsText1448" font-family="Helvetica, Arial, sans-serif" x="20" y="195.01841644248964" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1449">40</tspan><title>40</title></text><text id="SvgjsText1451" font-family="Helvetica, Arial, sans-serif" x="20" y="218.3067616485596" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1452">30</tspan><title>30</title></text><text id="SvgjsText1454" font-family="Helvetica, Arial, sans-serif" x="20" y="241.59510685462953" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1455">20</tspan><title>20</title></text><text id="SvgjsText1457" font-family="Helvetica, Arial, sans-serif" x="20" y="264.8834520606995" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1458">10</tspan><title>10</title></text></g></g><g id="SvgjsG1344" class="apexcharts-inner apexcharts-graphical" transform="translate(44.54721260070801, 30)"><defs id="SvgjsDefs1343"><clipPath id="gridRectMaskzurl7neg"><rect id="SvgjsRect1349" width="335.77383041381836" height="239.88345206069948" x="-3.5" y="-3.5" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMaskzurl7neg"><rect id="SvgjsRect1372" width="328.77383041381836" height="232.88345206069948" x="205.48364400863647" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect></clipPath><clipPath id="nonForecastMaskzurl7neg"><rect id="SvgjsRect1373" width="205.48364400863647" height="232.88345206069948" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect></clipPath><clipPath id="gridRectMarkerMaskzurl7neg"><rect id="SvgjsRect1350" width="384.77383041381836" height="288.8834520606995" x="-28" y="-28" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><line id="SvgjsLine1348" x1="0" y1="0" x2="0" y2="232.88345206069948" stroke="#b6b6b6" stroke-dasharray="3" stroke-linecap="butt" class="apexcharts-xcrosshairs" x="0" y="0" width="1" height="232.88345206069948" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><g id="SvgjsG1376" class="apexcharts-grid"><g id="SvgjsG1377" class="apexcharts-gridlines-horizontal"><line id="SvgjsLine1381" x1="0" y1="23.28834520606995" x2="328.77383041381836" y2="23.28834520606995" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1382" x1="0" y1="46.5766904121399" x2="328.77383041381836" y2="46.5766904121399" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1383" x1="0" y1="69.86503561820984" x2="328.77383041381836" y2="69.86503561820984" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1384" x1="0" y1="93.1533808242798" x2="328.77383041381836" y2="93.1533808242798" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1385" x1="0" y1="116.44172603034974" x2="328.77383041381836" y2="116.44172603034974" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1386" x1="0" y1="139.7300712364197" x2="328.77383041381836" y2="139.7300712364197" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1387" x1="0" y1="163.01841644248964" x2="328.77383041381836" y2="163.01841644248964" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1388" x1="0" y1="186.3067616485596" x2="328.77383041381836" y2="186.3067616485596" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1389" x1="0" y1="209.59510685462953" x2="328.77383041381836" y2="209.59510685462953" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line></g><g id="SvgjsG1378" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine1392" x1="0" y1="232.88345206069948" x2="328.77383041381836" y2="232.88345206069948" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine1391" x1="0" y1="1" x2="0" y2="232.88345206069948" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g><g id="SvgjsG1379" class="apexcharts-grid-borders"><line id="SvgjsLine1380" x1="0" y1="0" x2="328.77383041381836" y2="0" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1390" x1="0" y1="232.88345206069948" x2="328.77383041381836" y2="232.88345206069948" stroke="#e0e0e0" stroke-dasharray="7" stroke-linecap="butt" class="apexcharts-gridline"></line></g><g id="SvgjsG1351" class="apexcharts-line-series apexcharts-plot-series"><g id="SvgjsG1352" class="apexcharts-series" zIndex="0" seriesName="Sales" data:longestSeries="true" rel="1" data:realIndex="0"><path id="SvgjsPath1374" d="M 0 232.88345206069948 L 41.096728801727295 65.20736657699584 L 82.19345760345459 81.50920822124482 L 123.29018640518188 97.81104986549377 L 164.38691520690918 146.71657479824069 L 205.48364400863647 116.44172603034974 L 246.58037281036377 142.05890575702668 L 287.67710161209106 44.24785589153288 L 328.77383041381836 4.657669041213978" fill="none" fill-opacity="1" stroke="rgba(58,87,232,0.85)" stroke-opacity="1" stroke-linecap="butt" stroke-width="3" stroke-dasharray="0" class="apexcharts-line" index="0" clip-path="url(#nonForecastMaskzurl7neg)" pathTo="M 0 232.88345206069948 L 41.096728801727295 65.20736657699584 L 82.19345760345459 81.50920822124482 L 123.29018640518188 97.81104986549377 L 164.38691520690918 146.71657479824069 L 205.48364400863647 116.44172603034974 L 246.58037281036377 142.05890575702668 L 287.67710161209106 44.24785589153288 L 328.77383041381836 4.657669041213978" pathFrom="M -1 256.17179726676943 L -1 256.17179726676943 L 41.096728801727295 256.17179726676943 L 82.19345760345459 256.17179726676943 L 123.29018640518188 256.17179726676943 L 164.38691520690918 256.17179726676943 L 205.48364400863647 256.17179726676943 L 246.58037281036377 256.17179726676943 L 287.67710161209106 256.17179726676943 L 328.77383041381836 256.17179726676943" fill-rule="evenodd"></path><path id="SvgjsPath1375" d="M 0 232.88345206069948 L 41.096728801727295 65.20736657699584 L 82.19345760345459 81.50920822124482 L 123.29018640518188 97.81104986549377 L 164.38691520690918 146.71657479824069 L 205.48364400863647 116.44172603034974 L 246.58037281036377 142.05890575702668 L 287.67710161209106 44.24785589153288 L 328.77383041381836 4.657669041213978" fill="none" fill-opacity="1" stroke="rgba(58,87,232,0.85)" stroke-opacity="1" stroke-linecap="butt" stroke-width="3" stroke-dasharray="4" class="apexcharts-line" index="0" clip-path="url(#forecastMaskzurl7neg)" pathTo="M 0 232.88345206069948 L 41.096728801727295 65.20736657699584 L 82.19345760345459 81.50920822124482 L 123.29018640518188 97.81104986549377 L 164.38691520690918 146.71657479824069 L 205.48364400863647 116.44172603034974 L 246.58037281036377 142.05890575702668 L 287.67710161209106 44.24785589153288 L 328.77383041381836 4.657669041213978" pathFrom="M -1 256.17179726676943 L -1 256.17179726676943 L 41.096728801727295 256.17179726676943 L 82.19345760345459 256.17179726676943 L 123.29018640518188 256.17179726676943 L 164.38691520690918 256.17179726676943 L 205.48364400863647 256.17179726676943 L 246.58037281036377 256.17179726676943 L 287.67710161209106 256.17179726676943 L 328.77383041381836 256.17179726676943"></path><g id="SvgjsG1353" class="apexcharts-series-markers-wrap apexcharts-hidden-element-shown" data:realIndex="0"><g id="SvgjsG1355" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1356" r="6" cx="0" cy="232.88345206069948" class="apexcharts-marker no-pointer-events w4x5cwp2m" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="0" j="0" index="0" default-marker-size="6"></circle><circle id="SvgjsCircle1357" r="6" cx="41.096728801727295" cy="65.20736657699584" class="apexcharts-marker no-pointer-events wkmpvvjqw" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="1" j="1" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1358" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1359" r="6" cx="82.19345760345459" cy="81.50920822124482" class="apexcharts-marker no-pointer-events wuer3i67r" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="2" j="2" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1360" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1361" r="6" cx="123.29018640518188" cy="97.81104986549377" class="apexcharts-marker no-pointer-events wiaf4z9ac" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="3" j="3" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1362" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1363" r="6" cx="164.38691520690918" cy="146.71657479824069" class="apexcharts-marker no-pointer-events wt36uqiis" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="4" j="4" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1364" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1365" r="6" cx="205.48364400863647" cy="116.44172603034974" class="apexcharts-marker no-pointer-events wsvi2wnup" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="5" j="5" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1366" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1367" r="6" cx="246.58037281036377" cy="142.05890575702668" class="apexcharts-marker no-pointer-events wi40jvgxd" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="6" j="6" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1368" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1369" r="6" cx="287.67710161209106" cy="44.24785589153288" class="apexcharts-marker no-pointer-events w6verk6aj" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="7" j="7" index="0" default-marker-size="6"></circle></g><g id="SvgjsG1370" class="apexcharts-series-markers" clip-path="url(#gridRectMarkerMaskzurl7neg)"><circle id="SvgjsCircle1371" r="6" cx="328.77383041381836" cy="4.657669041213978" class="apexcharts-marker no-pointer-events wxqkr2fg2" stroke="#3a57e8" fill="#ffffff" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" rel="8" j="8" index="0" default-marker-size="6"></circle></g></g></g><g id="SvgjsG1354" class="apexcharts-datalabels" data:realIndex="0"></g></g><line id="SvgjsLine1393" x1="0" y1="0" x2="328.77383041381836" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1394" x1="0" y1="0" x2="328.77383041381836" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1395" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1396" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"><text id="SvgjsText1398" font-family="Helvetica, Arial, sans-serif" x="0" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1399">Jan</tspan><title>Jan</title></text><text id="SvgjsText1401" font-family="Helvetica, Arial, sans-serif" x="41.096728801727295" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1402">Feb</tspan><title>Feb</title></text><text id="SvgjsText1404" font-family="Helvetica, Arial, sans-serif" x="82.19345760345459" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1405">Mar</tspan><title>Mar</title></text><text id="SvgjsText1407" font-family="Helvetica, Arial, sans-serif" x="123.29018640518188" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1408">Apr</tspan><title>Apr</title></text><text id="SvgjsText1410" font-family="Helvetica, Arial, sans-serif" x="164.38691520690918" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1411">May</tspan><title>May</title></text><text id="SvgjsText1413" font-family="Helvetica, Arial, sans-serif" x="205.48364400863647" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1414">Jun</tspan><title>Jun</title></text><text id="SvgjsText1416" font-family="Helvetica, Arial, sans-serif" x="246.58037281036377" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1417">Jul</tspan><title>Jul</title></text><text id="SvgjsText1419" font-family="Helvetica, Arial, sans-serif" x="287.67710161209106" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1420">Aug</tspan><title>Aug</title></text><text id="SvgjsText1422" font-family="Helvetica, Arial, sans-serif" x="328.77383041381836" y="261.8834520606995" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1423">Sep</tspan><title>Sep</title></text></g></g><g id="SvgjsG1459" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1460" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1461" class="apexcharts-point-annotations"></g><rect id="SvgjsRect1462" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-zoom-rect"></rect><rect id="SvgjsRect1463" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-selection-rect"></rect></g></svg><div class="apexcharts-tooltip apexcharts-theme-light"><div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div><div class="apexcharts-tooltip-series-group" style="order: 1;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(58, 87, 232);"></span><div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div class="apexcharts-yaxistooltip-text"></div></div></div></div>
            </div>
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
        <div class="card card-block card-stretch card-height">
            <nav class="tab-bottom-bordered">
                <div class="mb-0 nav nav-tabs justify-content-around" id="nav-tab1" role="tablist">
                    <button class="nav-link py-3 active" id="nav-home-11-tab" data-bs-toggle="tab" data-bs-target="#nav-home-11" type="button" role="tab" aria-controls="nav-home-11" aria-selected="true">Payments</button>
                    <button class="nav-link py-3" id="nav-profile-11-tab" data-bs-toggle="tab" data-bs-target="#nav-profile-11" type="button" role="tab" aria-controls="nav-profile-11" aria-selected="false" tabindex="-1">Settlements</button>
                    <button class="nav-link py-3" id="nav-contact-11-tab" data-bs-toggle="tab" data-bs-target="#nav-contact-11" type="button" role="tab" aria-controls="nav-contact-11" aria-selected="false" tabindex="-1">Refunds</button>
                </div>
            </nav>
            <div class="tab-content iq-tab-fade-up" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home-11" role="tabpanel" aria-labelledby="nav-home-11-tab">
                    <div class="table-responsive">
                        <table id="transaction-table" class="table mb-0 table-striped" role="grid">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,833</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_vxnnjigakm
                                    </td>
                                    <td class="text-dark">1 Hour Ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success ">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,204</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_uwsxaiuhhs
                                    </td>
                                    <td class="text-dark">23 Days Ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,833</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_taxrcfzhny
                                    </td>
                                    <td class="text-dark">1 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,235</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_pknfotsmhl
                                    </td>
                                    <td class="text-dark">1 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,442</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_xqgczqbgto
                                    </td>
                                    <td class="text-dark">3 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,924</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_eoasrkizdw
                                    </td>
                                    <td class="text-dark">4 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile-11" role="tabpanel" aria-labelledby="nav-profile-11-tab">
                    <div class="table-responsive">
                        <table id="transaction-table-1" class="table mb-0 table-striped" role="grid">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,298</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_ufsoishqbw
                                    </td>
                                    <td class="text-dark">7 Days Ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success ">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,032</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_fescijfgbb
                                    </td>
                                    <td class="text-dark">23 Days </td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,514</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_eihghndltk
                                    </td>
                                    <td class="text-dark">1 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,425</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_bvihnfpdfq
                                    </td>
                                    <td class="text-dark">2 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,838</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_afrtmvdyjp
                                    </td>
                                    <td class="text-dark">2 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,613</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_jterqcvjxz
                                    </td>
                                    <td class="text-dark">5 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Processed</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-contact-11" role="tabpanel" aria-labelledby="nav-contact-11-tab">
                    <div class="table-responsive">
                        <table id="transaction-table-2" class="table mb-0 table-striped" role="grid">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,866</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_odqethdqye
                                    </td>
                                    <td class="text-dark">3 Days Ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-info ">Process</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$1,637</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_nmngvsosnh
                                    </td>
                                    <td class="text-dark">22 Days Ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Refunded</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,922</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_uikgtphcpo
                                    </td>
                                    <td class="text-dark">1 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Refunded</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,563</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_cieqrdyqkp
                                    </td>
                                    <td class="text-dark">2 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-info">Process</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,334</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_wmdvzpfavx
                                    </td>
                                    <td class="text-dark">3 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-success">Refunded</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">$2,632</h6>
                                        </div>
                                    </td>
                                    <td class="text-primary">
                                        hui_jplpprjzbr
                                    </td>
                                    <td class="text-dark">5 month ago</td>
                                    <td class="text-end">
                                        <span class="badge rounded-pill bg-danger">Failed</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <a href="javascript:void(0);">
                    <span class="me-2">
                        View all Settlements
                    </span>
                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
</div>
</Fragment>
  )
})
Faq.displayName = "Faq"
export default Dashboard