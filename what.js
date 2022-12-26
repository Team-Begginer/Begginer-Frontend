(__jsDragSearchHandler = (function () {
  try {
    var r,
      n,
      o,
      a,
      s,
      d,
      t,
      i,
      l,
      c,
      u = "DragSchLayerPos",
      m = "DragSchLayer",
      p = navigator.userAgent.indexOf("MSIE"),
      g = navigator.userAgent.indexOf("Opera");
    return (
      (_jsAddEvent = function (e, t, n) {
        e.addEventListener
          ? ("mousewheel" == t && (t = "DOMMouseScroll"),
            e.addEventListener(t, n, !1))
          : e.attachEvent("on" + t, n);
      }),
      (_jsStopEvent = function (e) {
        var e = e || window.event;
        e.preventDefault
          ? (e.preventDefault(), e.stopPropagation())
          : ((e.returnValue = !1), (e.cancelBubble = !0));
      }),
      (_jsRemove = function (e) {
        return (e = document.getElementById(e)), e.parentNode.removeChild(e), e;
      }),
      (_jsGetStyle = function (e, t) {
        var n = e.style[t],
          o,
          n;
        return (
          n ||
            (document.defaultView &&
            document.defaultView.getComputedStyle &&
            -1 == g
              ? ((o = document.defaultView.getComputedStyle(e, null)),
                (n = o ? o[t] : null))
              : e.currentStyle &&
                (n =
                  "backgroundPosition" == t
                    ? e.currentStyle.backgroundPositionX +
                      " " +
                      e.currentStyle.backgroundPositionY
                    : e.currentStyle[t])),
          "auto" == n ? null : n
        );
      }),
      (_jsTrim = function (e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
      }),
      (_jsSetSelectionAttrs = function () {
        (r = document.selection.createRange()),
          (n = r.text.toString()),
          (a = r.htmlText);
      }),
      (_jsDragHandler = function (e) {
        try {
          (o = n),
            (i || s) && _jsCleanSelection(),
            window.getSelection
              ? document.activeElement &&
                "textarea" != document.activeElement.tagName.toLowerCase() &&
                "input" != document.activeElement.tagName.toLowerCase() &&
                ((r = window.getSelection()),
                !r.duplicate && document.selection
                  ? _jsSetSelectionAttrs()
                  : ((n = r.toString()), (a = n)))
              : document.selection && _jsSetSelectionAttrs(),
            (n = _jsTrim(n)),
            "" != n && n != o && 1 < n.length
              ? (_jsGetStrChk(e),
                l ? (_jslayerHandler(), _jsStopEvent(e)) : _jsCleanSelection())
              : _jsCleanSelection();
        } catch (t) {
          _jsCleanSelection();
        }
      }),
      (_jsGetStrChk = function (e) {
        var t = a.length;
        (l = !0),
          0 < n.indexOf(" ")
            ? 10 < n.length && (l = !1)
            : 20 < n.length && (l = !1),
          l &&
            ((_nodeName =
              "Microsoft Internet Explorer" != navigator.appName &&
              "Netscape" == navigator.appName
                ? ((_event = e), _event.target.nodeName)
                : ((_event = window.event), _event.srcElement.nodeName)),
            ("INPUT" != _nodeName &&
              "SELECT" != _nodeName &&
              "TEXTAREA" != _nodeName &&
              "FIELDSET" != _nodeName) ||
              (l = !1),
            -1 != p &&
              l &&
              4 < t &&
              ((strChkBr = _jsTrim(a.substring(t - 4, t))),
              "<BR>" == strChkBr.toUpperCase() && (l = !1),
              0 < a.toUpperCase().indexOf("</DT>") && (l = !1)));
      }),
      (_jslayerHandler = function () {
        try {
          var e, t, n, o;
          (s = document.createElement("span")),
            (s.id = u),
            (s.style.position = "absolute"),
            (s.style.width = "0px"),
            (s.style.height = "0px"),
            (s.style.fontSize = "0px"),
            -1 != p
              ? ((e = document.createElement("div")),
                e.appendChild(s),
                (d = r.duplicate()),
                d.setEndPoint("StartToEnd", r),
                d.pasteHTML(e.innerHTML),
                (s = document.getElementById(u)))
              : ((t = r.getRangeAt(0)),
                (d = document.createRange()),
                d.setStart(r.focusNode, t.endOffset),
                d.insertNode(s)),
            document.getElementById(m) ||
              ((n = document.getElementsByTagName("body")),
              (o = document.createElement("span")),
              o.setAttribute("id", m),
              n[0].appendChild(o),
              (document.getElementById(m).style.display = "none")),
            (i = document.getElementById(m)),
            (i.style.display = "block"),
            _jsPositionHandler(),
            _jsAddEvent(i, "mouseup", _jsLinkHandler),
            _jsAddEvent(window, "resize", _jsPositionHandler),
            (c = self.setInterval(_jsChkNodeStyle, 500));
        } catch (a) {
          _jsCleanSelection();
        }
      }),
      (_jsPositionHandler = function (e) {
        i &&
          s &&
          ((t = _jsPositionOffset(document.getElementById(u))),
          (i.style.top = t[0] + "px"),
          (i.style.left = t[1] + "px"));
      }),
      (_jsPositionOffset = function (e) {
        for (
          var t = 0, n = 0;
          (t += e.offsetTop || 0),
            (n += e.offsetLeft || 0),
            (e = e.offsetParent),
            e;

        );
        return (
          t < 22 && (t += 40),
          n + 70 > document.body.offsetWidth && (n -= 60),
          [t, n]
        );
      }),
      (_jsLinkHandler = function (e) {
        var t =
            "https://dragsearch.kakaocorp.com/fcgi/dha_morph_delete_josa.fcgi?q=" +
            encodeURIComponent(n),
          t = window.open(t);
        t && t.focus(), _jsCleanSelection(), _jsStopEvent(e);
      }),
      (_jsChkNodeStyle = function () {
        if (document.getElementById("DragSchLayerPos")) {
          var e = document.getElementById("DragSchLayerPos");
          do {
            if (1 != e.nodeType) {
              e = null;
              break;
            }
            var e = e.parentNode,
              t = _jsGetStyle(e, "display");
            if ("none" == t) {
              _jsCleanSelection();
              break;
            }
          } while ("BODY" != e.nodeName.toUpperCase());
        }
      }),
      (_jsCleanSelection = function () {
        try {
          (r = null),
            (s = null),
            (n = ""),
            d && d.pasteHTML && d.pasteHTML(""),
            (d = null),
            document.getElementById(u) && _jsRemove(u),
            document.getElementById(m) &&
              (document.getElementById(m).style.display = "none"),
            document.getElementById(m) && _jsRemove(m),
            clearInterval(c);
        } catch (e) {}
      }),
      (_jsInitStyle = function () {
        var e = document.createElement("style"),
          t =
            "#DragSchLayer{display:block;position:absolute;z-index:1000;width:61px;height:31px;margin:-30px 0px 0px -5px;background:url(//search1.daumcdn.net/search/statics/common/pi/btn_drag_rect.png);cursor:pointer}             @media             only screen and (-webkit-min-device-pixel-ratio: 1.5),             only screen and (min-device-pixel-ratio: 1.5),             only screen and (min-resolution: 1.5dppx) {             #DragSchLayer{background-image:url(//search1.daumcdn.net/search/statics/common/pi/r2/btn_drag_rect.png);background-size:61px 31px}}            ";
        (e.type = "text/css"),
          e.styleSheet && !e.sheet
            ? (e.styleSheet.cssText = t)
            : e.appendChild(document.createTextNode(t)),
          document.getElementsByTagName("head")[0].appendChild(e);
      }),
      {
        initialize: function () {
          _jsInitStyle(), _jsAddEvent(document, "mouseup", _jsDragHandler);
        },
      }
    );
  } catch (e) {}
})()),
  __jsDragSearchHandler.initialize();
