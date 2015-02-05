$(document).ready(function() {
    //define functions
    function h() {
        b.masonry({
            itemSelector: "article",
            transitionDuration: 0
        });
        $("img") ? b.imagesLoaded().progress(function() {
            $(".init-posts").addClass("active");
            b.masonry()
        }) : ($(".init-posts").addClass("active"), b.masonry());
        b.imagesLoaded(function() {
            b.masonry()
        })
    }

    function d() {
        $(".photo-slideshow").each(function() {
            $(this).magnificPopup({
                delegate: ".photo-data a",
                type: "image",
                gallery: {
                    enabled: !0,
                    tCounter: "%curr%/%total%"
                },
                tLoading: wordLoading
            })
        })
    }

    function e() {
        $(".tags a").each(function() {
            "featured" ==
            $(this).text() && ($(this).closest("article").addClass("featured"), $(this).hide())
        });
        650 < k && $(".post-photo.featured img, .post-photoset.featured img").each(function() {
            var a = $(this).data("highres");
            $(this).attr("src", a)
        })
    }

    function f() {
        $(".like_button").attrchange({
            trackValues: !0,
            callback: function(a) {
                $(this).hasClass("liked") ? $(this).closest(".like-wrap").addClass("loved") : $(this).closest(".like-wrap").removeClass("loved")
            }
        })
    }

    function c() {
        var a = $(".tumblr_video_iframe").contents().find(".vjs-tech").height();
        $(".tumblr_video_iframe").css("height", a)
    }

    function g() {
        $(".grid article").fitVids();
        c();
        $(window).load(function() {
            c()
        });
        $('iframe[src*="embed.spotify.com"], iframe.tumblr_audio_player').each(function() {
            $(this).css("width", $(this).parent(1).css("width"));
            $(this).attr("src", $(this).attr("src"))
        });
        $(window).resize(function() {
            $('iframe[src*="embed.spotify.com"], iframe.tumblr_audio_player').each(function() {
                $(this).css("width", $(this).parent(1).css("width"));
                $(this).attr("src", $(this).attr("src"))
            })
        })
    }

    function l() {
        $(".bottom-nav").addClass("infinite-off")
    }

    function quotesize() {
        $(".post-qoute blockquote.raw").each(function() {
            var $words = $(this).text().split(" ").length;
            if ($words > 60) {
                $(this).css("font-size", "1.0em");
            } else if ($words > 40) {
                $(this).css("font-size", "1.2em");
            } else if ($words > 20) {
                $(this).css("font-size", "1.4em");
            }
            $(this).removeClass("raw");
        });
    }

    //execute functions
    var b = $(".grid");
    $(".grid article");
    var m = $(window).height(),
        k = $(window).width();
    (function() {
        function a() {
            b.hasClass("menu-open") ? d.text("menu") : d.text(wordClose)
        }
        var b = $("#container"),
            c = $("#trigger-menu"),
            d = $("#trigger-menu .title");
        c.click(function() {
            a();
            b.toggleClass("menu-open");
            $(this).toggleClass("active")
        });
        $("#content-wrapper").click(function() {
            b.hasClass("menu-open") && (a(), c.removeClass("active"), b.removeClass("menu-open"))
        })
    })();

    (function(a) {
        0 !==
            $("#" + a).length && $(".post-content").contents().filter(function() {
                return 3 === this.nodeType
            }).wrap("<p>")
    })("submit_form");

    $("p:empty").remove();

    (function() {
        b.on("click", ".js-share", function(a) {
            $(this).closest(".share-wrap").toggleClass("active");
            a.preventDefault()
        })
    })();

    quotesize();
    f();
    e();
    $(".grid").hasClass("permapage") || $(".grid").hasClass("searchpage") || h();
    g();
    c();
    $(".photo-slideshow").pxuPhotoset();
    d();
    $("iframe").is("#submit_form") ? $(".actions").hide() : $("iframe").is("#ask_form") && $(".actions").hide();
    $(".like_button")[0] ? $(".grid").removeClass("page") : $(".grid").addClass("page");

    (function() {
        $(window).load(function() {
            $(".pusher").css("min-height", m)
        })
    })();

    (function() {
        $(".scroll-top").click(function(a) {
            $("body,html").animate({
                scrollTop: 0
            }, 400);
            a.preventDefault()
        })
    })();

    (function() {
        b.infinitescroll({
                navSelector: ".pagination",
                nextSelector: ".pagination a.next",
                itemSelector: ".init-posts article",
                loading: {
                    finishedMsg: "",
                    msgText: '<div aria-hidden="true" data-icon="&#x292e" class="spinner"></div>'
                },
                errorCallback: l
            },
            function(a) {
                a = $(a);
                var c = a.map(function() {
                    return this.id
                }).get();
                b.masonry("appended", a, !0);
                a.css("opacity", "0");
                a.animate({
                    opacity: 1
                }, 1E3);
                Tumblr.LikeButton.get_status_by_post_ids(c);
                a.imagesLoaded().progress(function() {
                    b.masonry()
                });
                a.imagesLoaded(function() {
                    b.masonry()
                });
                a.find(".photo-slideshow").pxuPhotoset();
                quotesize();
                e();
                f();
                d();
                $("p:empty").remove();
                g();
                b.masonry();
            })
    })();

    (function() {
        $(window).unbind(".infscr");
        $(".load-more").click(function(a) {
            b.infinitescroll("retrieve");
            a.preventDefault()
        })
    })();

    FastClick.attach(document.body)
});
