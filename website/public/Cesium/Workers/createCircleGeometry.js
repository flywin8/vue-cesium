define([
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './EllipseGeometry-e21d5877',
  './VertexFormat-ab2e00e6',
  './Math-e97915da',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './EllipseGeometryLibrary-4fec0674',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryInstance-9b27c40d',
  './GeometryOffsetAttribute-04332ce7',
  './GeometryPipeline-b7404acc',
  './AttributeCompression-e18a879a',
  './EncodedCartesian3-de837603',
  './IndexDatatype-2149f06c',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, t, i, r, o, a, n, s, l, d, m, c, u, p, y, _, x, G, h, f, g, E) {
  'use strict'
  function w(e) {
    const r = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).radius,
      o = {
        center: e.center,
        semiMajorAxis: r,
        semiMinorAxis: r,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        vertexFormat: e.vertexFormat,
        stRotation: e.stRotation,
        shadowVolume: e.shadowVolume
      }
    ;(this._ellipseGeometry = new i.EllipseGeometry(o)), (this._workerName = 'createCircleGeometry')
  }
  ;(w.packedLength = i.EllipseGeometry.packedLength),
    (w.pack = function (e, t, r) {
      return i.EllipseGeometry.pack(e._ellipseGeometry, t, r)
    })
  const A = new i.EllipseGeometry({ center: new e.Cartesian3(), semiMajorAxis: 1, semiMinorAxis: 1 }),
    M = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      vertexFormat: new r.VertexFormat(),
      stRotation: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      shadowVolume: void 0
    }
  return (
    (w.unpack = function (o, a, n) {
      const s = i.EllipseGeometry.unpack(o, a, A)
      return (
        (M.center = e.Cartesian3.clone(s._center, M.center)),
        (M.ellipsoid = e.Ellipsoid.clone(s._ellipsoid, M.ellipsoid)),
        (M.height = s._height),
        (M.extrudedHeight = s._extrudedHeight),
        (M.granularity = s._granularity),
        (M.vertexFormat = r.VertexFormat.clone(s._vertexFormat, M.vertexFormat)),
        (M.stRotation = s._stRotation),
        (M.shadowVolume = s._shadowVolume),
        t.defined(n)
          ? ((M.semiMajorAxis = s._semiMajorAxis), (M.semiMinorAxis = s._semiMinorAxis), (n._ellipseGeometry = new i.EllipseGeometry(M)), n)
          : ((M.radius = s._semiMajorAxis), new w(M))
      )
    }),
    (w.createGeometry = function (e) {
      return i.EllipseGeometry.createGeometry(e._ellipseGeometry)
    }),
    (w.createShadowVolume = function (e, t, i) {
      const o = e._ellipseGeometry._granularity,
        a = e._ellipseGeometry._ellipsoid,
        n = t(o, a),
        s = i(o, a)
      return new w({
        center: e._ellipseGeometry._center,
        radius: e._ellipseGeometry._semiMajorAxis,
        ellipsoid: a,
        stRotation: e._ellipseGeometry._stRotation,
        granularity: o,
        extrudedHeight: n,
        height: s,
        vertexFormat: r.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      })
    }),
    Object.defineProperties(w.prototype, {
      rectangle: {
        get: function () {
          return this._ellipseGeometry.rectangle
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return this._ellipseGeometry.textureCoordinateRotationPoints
        }
      }
    }),
    function (i, r) {
      return (
        t.defined(r) && (i = w.unpack(i, r)),
        (i._ellipseGeometry._center = e.Cartesian3.clone(i._ellipseGeometry._center)),
        (i._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid)),
        w.createGeometry(i)
      )
    }
  )
})
