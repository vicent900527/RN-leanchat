//
//  CDPopMenuItem.h
//  LeanChat
//
//  Created by Qihe Bian on 7/30/14.
//  Copyright (c) 2014 LeanCloud. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#define kCDMenuTableViewWidth 140
#define kCDMenuTableViewSapcing 7

#define kCDMenuItemViewHeight 40
#define kCDMenuItemViewImageSapcing 15
#define kCDSeparatorLineImageViewHeight 0.5

@interface CDPopMenuItem : NSObject

@property (nonatomic, strong) UIImage *image;

@property (nonatomic, strong) NSString *title;

- (instancetype)initWithImage:(UIImage *)image title:(NSString *)title;

@end
