#!/usr/bin/env python3
"""Local preview server that resolves URLs the way GitHub Pages does.

Python's stock http.server 404s on /company-as-codebase because the file on disk
is company-as-codebase.html. GitHub Pages serves it fine. That mismatch makes a
perfectly healthy build look broken in local preview — every extensionless link
in the site appears dead, and the site is full of them.

This adds the two fallbacks GitHub Pages applies, and nothing else:
  /foo   -> foo.html      (extensionless pretty URL)
  /foo/  -> foo/index.html (already stock behavior, kept explicit)
plus a real 404.html body for genuine misses, so a broken link looks broken
instead of showing Python's directory listing.

Usage: python3 serve.py [port] [--dir DIR]
"""

import argparse
import os
import sys
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler


class PagesHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        if os.path.isdir(local) or os.path.exists(local):
            return local
        # /foo -> /foo.html, matching GitHub Pages' pretty-URL fallback.
        if not os.path.splitext(local)[1] and os.path.isfile(local + ".html"):
            return local + ".html"
        return local

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            custom = os.path.join(self.directory, "404.html")
            if os.path.isfile(custom):
                body = open(custom, "rb").read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                if self.command != "HEAD":
                    self.wfile.write(body)
                return
        super().send_error(code, message, explain)

    def log_message(self, fmt, *args):
        status = str(args[1]) if len(args) > 1 else ""
        if status.startswith(("4", "5")):
            sys.stderr.write("  %s %s\n" % (status, args[0]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("port", nargs="?", type=int, default=4002)
    ap.add_argument("--dir", default="_site")
    a = ap.parse_args()
    handler = partial(PagesHandler, directory=a.dir)
    srv = HTTPServer(("127.0.0.1", a.port), handler)
    print("  serving %s on http://127.0.0.1:%d/ (GitHub Pages URL rules)" % (a.dir, a.port))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
