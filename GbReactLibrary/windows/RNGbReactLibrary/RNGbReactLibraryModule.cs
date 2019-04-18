using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Gb.React.Library.RNGbReactLibrary
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNGbReactLibraryModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNGbReactLibraryModule"/>.
        /// </summary>
        internal RNGbReactLibraryModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNGbReactLibrary";
            }
        }
    }
}
