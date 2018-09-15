{
  'variables': {
    'build_v8_with_gn': 'false',
  },
  'targets': [
    {
      'target_name': 'ptlib',
      'include_dirs' : [
        "<!(node -e \"require('nan')\")",
        "../ptlib/include"
      ],
      'sources': [
        'pt-src/ptlib-nodejs-binding.cpp'
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
        ]
      },
      'cflags': [
      ],
      'libraries': [
        "<!(node -e \"console.log(require('path').join('..', '..', 'ptlib', 'target', 'release', 'libptlib.a'))\")"
      ],
      'conditions': [
      ],
    }
  ]
}
